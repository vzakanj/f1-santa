

export class Shaders {

    static createWhiteShader() {
        return {
            text: ["precision mediump float;",
                "varying vec2 vTextureCoord;",
                "uniform sampler2D uSampler;",
                "uniform float uWhiteAmount;",

                "void main(void) {",

                "vec4 texColor = texture2D(uSampler, vTextureCoord);",
                "float white = 1.0 - uWhiteAmount;",
                "if (texColor.a > 0.0 && white != 0.0) {",
                "texColor = vec4(texColor.rgb / white, texColor.a);",
                "}",
                "gl_FragColor = texColor;",
                "}"],
            uniforms: {
                uWhiteAmount: { type: '1f', value: 0.0 }
            }
        }
    }
}