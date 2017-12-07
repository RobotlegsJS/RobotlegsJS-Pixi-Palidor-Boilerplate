// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { PalidorPixiExtension } from "@robotlegsjs/pixi-palidor";
import { CanvasRenderer, Container, WebGLRenderer, autoDetectRenderer } from "pixi.js";

import { ExampleConfig } from "./config/ExampleConfig";

class Main {
    private stage: Container;
    private renderer: CanvasRenderer | WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = autoDetectRenderer(400, 600, {});
        this.stage = new Container();
        this.context = new Context();
        this.context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this.stage))
            .configure(ExampleConfig)
            .initialize();

        document.body.appendChild(this.renderer.view);
    }
    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    }
}
const main = new Main();
main.render();
