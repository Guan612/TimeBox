/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
		preflight: false // 关闭默认样式
	}
}
