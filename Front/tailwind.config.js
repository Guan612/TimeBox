/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
    colors:{
      "transblue":"#5BCEFA",
      "transpink":"#F5A9B8",
    }
  },
  plugins: [],
  corePlugins: {
		preflight: false // 关闭默认样式
	}
}

