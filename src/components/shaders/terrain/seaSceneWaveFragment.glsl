uniform vec3 foamColor;
varying vec3 vPosition;
varying float vWave;

void main() {
    vec3 waterColor = mix(vec3(0.0, 0.6, 0.9), vec3(0.0, 0.3, 0.5), vWave * 0.5 + 0.5); // first vec3 is deep water color, second is shallow water color
    float foam = smoothstep(0.9, 1.0, vWave); //edge0, edge1, vWave where thicker foam is edge0 far from edge 1
    vec3 finalColor = mix(waterColor, foamColor, foam);
    gl_FragColor = vec4(finalColor, 1.0);
}


