precision mediump float;

uniform sampler2D vram;

varying vec2 vTexture;
varying vec3 vColor;

void main(void) {
	gl_FragColor = vec4(1.0,0.0,0.0,1.0); //vec4(texture2D(vram, vTexture).rgb * vColor, 1.0);
}
