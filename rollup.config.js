import pluginBabel from '@rollup/plugin-babel';
import pluginTerser from 'rollup-plugin-terser';
import pluginCommonJS from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';

export default [
	{
		input: 'source/index.js',
		output: {
			file: 'build/index.js',
			format: 'esm',
			sourcemap: true,
		},
		plugins: [
			pluginNodeResolve({ preferBuiltins: true }),
			pluginCommonJS(),
			pluginBabel({
				babelHelpers: 'bundled',
				presets: ['@babel/preset-env'],
			}),
			pluginTerser.terser({
				mangle: true,
				safari10: true,
			}),
		],
		external: [/@babel\/runtime/, 'react'],
	},
];
