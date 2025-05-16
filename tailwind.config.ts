
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// 1987-inspired colors
				neon: {
					pink: '#ff6ec4',
					blue: '#00e0ff',
					purple: '#7873f5',
					yellow: '#ffff00',
					green: '#00ff8c'
				}
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'mono': ['VT323', 'Courier New', 'monospace'],
				'retro': ['"Press Start 2P"', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%': { 
						textShadow: '0 0 5px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)' 
					},
					'50%': { 
						textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.5)' 
					},
					'100%': { 
						textShadow: '0 0 5px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.3)' 
					}
				},
				'vhs-glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'5%, 10%': { transform: 'translateX(-2px)' },
					'7.5%': { transform: 'translateX(2px)' },
					'12.5%': { transform: 'skewX(4deg)' },
					'15%': { transform: 'skewX(0)' },
				},
				'noise': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-1px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(1px)' },
				},
				'scanline': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'vhs-glitch': 'vhs-glitch 8s ease-in-out infinite',
				'noise': 'noise 0.2s infinite',
				'scanline': 'scanline 8s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
