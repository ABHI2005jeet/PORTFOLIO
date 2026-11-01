"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "./MotionProvider";
import styles from "./HeroAtmosphere.module.scss";

type MotionModule = typeof import("@/lib/motion/register");

const vertexShader = [
  "varying vec2 vUv;",
  "void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
].join("\n");

const fragmentShader = [
  "precision highp float;",
  "uniform vec2 u_resolution; uniform vec2 u_pointer; uniform float u_time; varying vec2 vUv;",
  "float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }",
  "float noise(vec2 p) { vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y); }",
  "float fbm(vec2 p) { float v=0.0, a=0.5; for(int i=0;i<4;i++){ v+=noise(p)*a; p*=2.03; a*=0.5; } return v; }",
  "void main() {",
  "vec2 uv=vUv; vec2 p=(uv-0.5)*vec2(u_resolution.x/max(u_resolution.y,1.0),1.0); float t=u_time*0.035;",
  "float a=fbm(p*2.2+vec2(t,-t*0.7)); float b=fbm(p*3.6-vec2(t*0.55,t*0.4)+4.3);",
  "float cloud=smoothstep(0.24,0.82,a*0.68+b*0.32);",
  "vec3 color=mix(vec3(0.035,0.04,0.058),vec3(0.10,0.11,0.25),smoothstep(0.30,0.83,cloud)*0.62);",
  "color=mix(color,vec3(0.22,0.16,0.38),smoothstep(0.50,0.91,a+b*0.14)*0.28);",
  "color=mix(color,vec3(0.055,0.19,0.23),smoothstep(0.64,0.96,b)*0.18);",
  "vec2 d=(uv-u_pointer)*vec2(u_resolution.x/max(u_resolution.y,1.0),1.0);",
  "float cone=exp(-length(d)*2.7)*smoothstep(0.92,0.18,abs(d.x+d.y*0.42)); color+=vec3(0.20,0.24,0.38)*cone*0.12;",
  "float vignette=smoothstep(1.08,0.18,length(p*vec2(0.78,1.0))); color*=mix(0.62,1.0,vignette);",
  "float grain=(hash(uv*u_resolution+fract(u_time)*100.0)-0.5)*0.018; color+=grain; gl_FragColor=vec4(color,1.0);",
  "}",
].join("\n");

export function HeroAtmosphere() {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { enabled, ready } = useMotion();

  useEffect(() => {
    const element = host.current;
    const canvas = canvasRef.current;
    if (!element || !canvas || !ready || !enabled) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const weakDevice = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (window.matchMedia("(max-width: 799px)").matches || connection?.saveData || (weakDevice && weakDevice <= 4) || navigator.hardwareConcurrency <= 4) return;

    let disposed = false;
    let initialized = false;
    let active = false;
    let gsapApi: MotionModule["gsap"] | undefined;
    let renderer: import("three").WebGLRenderer | undefined;
    let material: import("three").ShaderMaterial | undefined;
    let geometry: import("three").PlaneGeometry | undefined;
    let scene: import("three").Scene | undefined;
    let camera: import("three").OrthographicCamera | undefined;
    let quickX: ((value: number) => void) | undefined;
    let quickY: ((value: number) => void) | undefined;
    let idleHandle: number | ReturnType<typeof setTimeout> | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const render = (time: number) => {
      if (!active || !renderer || !scene || !camera || !material) return;
      material.uniforms.u_time.value = time;
      renderer.render(scene, camera);
    };
    const start = () => {
      if (!initialized || active || document.hidden) return;
      if (!gsapApi) return;
      active = true;
      gsapApi.ticker.add(render);
    };
    const stop = () => {
      if (!active) return;
      active = false;
      gsapApi?.ticker.remove(render);
    };
    const onVisibility = () => document.hidden ? stop() : start();
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !quickX || !quickY || !material) return;
      const rect = element.getBoundingClientRect();
      quickX((event.clientX - rect.left) / Math.max(1, rect.width));
      quickY(1 - (event.clientY - rect.top) / Math.max(1, rect.height));
    };
    const onLost = (event: Event) => { event.preventDefault(); stop(); canvas.hidden = true; };
    const onRestored = () => { canvas.hidden = false; start(); };

    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: 0.02 });
    observer.observe(element);
    document.addEventListener("visibilitychange", onVisibility);
    element.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);

    const initialize = async () => {
      if (disposed || initialized || !canvas.getContext("webgl2", { alpha: true, antialias: false })) return;
      try {
        const [{ gsap, registerMotion }, THREE] = await Promise.all([
          import("@/lib/motion/register"),
          import("three"),
        ]);
        if (disposed) return;
        registerMotion();
        gsapApi = gsap;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.62, 1.25));
        renderer.setClearColor(0x090a0f, 1);
        const uniforms = {
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_pointer: { value: new THREE.Vector2(0.75, 0.42) },
          u_time: { value: 0 },
        };
        material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false });
        geometry = new THREE.PlaneGeometry(2, 2);
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        scene.add(new THREE.Mesh(geometry, material));
        quickX = gsap.quickTo(uniforms.u_pointer.value, "x", { duration: 0.55, ease: "power2.out" });
        quickY = gsap.quickTo(uniforms.u_pointer.value, "y", { duration: 0.55, ease: "power2.out" });
        const resize = () => {
          const { width, height } = element.getBoundingClientRect();
          if (width <= 0 || height <= 0 || !renderer) return;
          renderer.setSize(width, height, false);
          uniforms.u_resolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
          start();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(element);
        element.dataset.webglReady = "true";
        canvas.hidden = false;
        initialized = true;
        resize();
        canvas.addEventListener("webglcontextrestored", onRestored);
      } catch {
        canvas.hidden = true;
      }
    };

    const idle = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (idle.requestIdleCallback) idleHandle = idle.requestIdleCallback(() => { void initialize(); }, { timeout: 1600 });
    else idleHandle = window.setTimeout(() => { void initialize(); }, 900);

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      element.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (typeof idleHandle === "number") {
        if (idle.cancelIdleCallback) idle.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      if (material) gsapApi?.killTweensOf(material.uniforms.u_pointer.value);
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, [enabled, ready]);

  return <div ref={host} className={styles.host} aria-hidden="true"><canvas ref={canvasRef} className={styles.canvas} tabIndex={-1} hidden /></div>;
}
