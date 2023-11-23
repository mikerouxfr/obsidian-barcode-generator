import { BarcodeProcessor } from "./barcode.interface";
import { BarcodeSettings } from "settings";
import { MarkdownPreviewRenderer } from "obsidian";
import JsBarcode from "jsbarcode";
import Barcode from "main";

export class SimpleBarcodeProcessor implements BarcodeProcessor {
	barcode_app: Barcode;

	constructor(app: Barcode) {
		this.barcode_app = app;
	}

	public processBarcode(): void {
		const settings: BarcodeSettings = this.barcode_app.settings;
		const tag_name: string = settings.barcode_name;

		const codeblockProcessor: MarkdownPostProcessor = this.barcode_app.registerMarkdownCodeBlockProcessor(tag_name, (content, el, _) => {
			const canvas = document.createElement('canvas');
			const options = Object.assign({}, settings);

			delete options.defaultFormat;
			options.format = settings.defaultFormat;

			JsBarcode(canvas, content.trim(), options);
			el.appendChild(canvas);
		});
		MarkdownPreviewRenderer.unregisterPostProcessor(MarkdownPostProcessor);
	}
}