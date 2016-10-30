

export class Shaders {

    static shader;

    static createWhiteShader(game:Phaser.Game){

        if(!this.shader){
            var data = { 
                text: [
                    "precision mediump float;",
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
                    "}"
                    ],
                uniforms: {
                    uWhiteAmount: { type: '1f', value: 0.0 }
                }
            }
            this.shader = new Phaser.Filter(game, data.uniforms, data.text);
        }
        return this.shader;
    }

/*
    static blurShaderData() {
        return {
            text: [
                "precision mediump float;",
                "varying vec2 vTextureCoord;",
                "varying vec4 vColor;",
                "uniform float u_blur;",
                "uniform sampler2D uSampler;",

                "void main(void) {",

                "vec4 sum = vec4(0.0);",

                "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*u_blur, vTextureCoord.y)) * 0.05;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*u_blur, vTextureCoord.y)) * 0.09;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*u_blur, vTextureCoord.y)) * 0.12;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x - u_blur, vTextureCoord.y)) * 0.15;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x + u_blur, vTextureCoord.y)) * 0.15;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*u_blur, vTextureCoord.y)) * 0.12;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*u_blur, vTextureCoord.y)) * 0.09;",
                "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*u_blur, vTextureCoord.y)) * 0.05;",

                "gl_FragColor = sum;",

                "}"
            ],
            uniforms: {
                u_blur: { type: '1f', value: 1.0 }
            }
        }
    }

    static getBlurShader = function (game: Phaser.Game) {
        // if (!this.blurShader) {
        //     this.blurShader = new Phaser.Filter(game, this.blurShaderData().uniforms, this.blurShaderData().text);
        // }
        // return this.blurShader;
        
        return new Phaser.Filter(game, this.blurShaderData().uniforms, this.blurShaderData().text);;
    }*/
}

