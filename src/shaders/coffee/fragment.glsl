varying vec3 vPosition;
uniform vec2 uCenter;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
varying float vElevation;

void main() {
  // 点の中心からの距離を元に透明度を指定し、丸くする
  float alpha = 1. - smoothstep(0.4995, 0.5005, length(gl_PointCoord - vec2(0.5))); 

  // 縁の中心と外側は薄くする
  float strength = pow(distance(vPosition.xy, uCenter), 5.0)  * 0.009;
  float strength2 = 1.0 - pow(distance(vPosition.xy, uCenter), 5.0)  * 0.005;

  //色をつける
  float mixStrength = (vElevation + 0.15) * 5.0;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  gl_FragColor = vec4(color, alpha  * strength2 );
  

}