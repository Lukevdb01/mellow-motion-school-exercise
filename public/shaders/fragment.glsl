uniform vec3 lightDirection;
uniform vec3 baseColor;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
    float intensity = dot(normalize(vNormal), normalize(lightDirection));
    float toonIntensity;

    if(intensity > 0.95)
        toonIntensity = 1.0;
    else if(intensity > 0.5)
        toonIntensity = 0.7;
    else if(intensity > 0.25)
        toonIntensity = 0.4;
    else
        toonIntensity = 0.2;

    vec3 color = baseColor * toonIntensity;
    gl_FragColor = vec4(color, 1.0);
}