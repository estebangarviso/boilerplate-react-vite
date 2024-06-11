import {
	type UserConfig,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import icons from 'unocss/preset-icons';
import typography from 'unocss/preset-typography';
import wind from 'unocss/preset-wind';

const FONT_FAMILY = process.env.FONT_FAMILY;

export default {
	presets: [typography(), wind({ preflight: true }), icons({ prefix: '' })],
	theme: {
		fontFamily: {
			sans: [FONT_FAMILY, 'sans-serif'],
			serif: [FONT_FAMILY, 'serif'],
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
} satisfies UserConfig;
