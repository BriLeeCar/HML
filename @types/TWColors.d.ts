type ColorsInferred = 'current' | 'inherit' | 'transparent'
type ColorNeutrals = 'black' | 'white'
type ColorShades = keyof (typeof import('tailwindcss/colors').default)[Exclude<
	keyof typeof import('tailwindcss/colors').default,
	'black' | 'white' | 'transparent' | 'current' | 'inherit'
>]
type Colors = Exclude<
	keyof typeof import('tailwindcss/colors').default,
	ColorNeutrals | ColorsInferred
>
type ColorStrings = `${Colors}-${ColorShades}` | ColorsInferred | ColorNeutrals

declare global {
	namespace TW {
		type DefaultTheme = typeof import('tailwindcss/defaultTheme').default
		type DefaultColors = typeof import('tailwindcss/colors').default
		type namespaces = ''

		namespace Font {
			type NameSpaceKey = 'font'

			type Package = {
				sans: string[]
				serif: string[]
				mono: string[]
			}

			type FamilyType = 'sans' | 'serif' | 'mono'
			type Styles = {
				css: `var(--${TW.Font.NameSpaceKey}-${TW.Font.FamilyType})`
				tsx: TW.Font.FamilyType
			}
		}

		namespace Colors {
			type NameSpaceKey = 'color'
			type Package = TW.DefaultColors
			type Key = keyof TW.DefaultColors

			type Inferred = ColorsInferred
			type Neutral = ColorNeutrals

			type WithShade = Exclude<TW.Colors.Key, TW.Colors.Neutral | TW.Colors.Inferred>
			type Shade = keyof TW.Colors.Package[TW.Colors.WithShade]

			type String = ColorStrings
			type StyleSheetString =
				`var(--${TW.Colors.NameSpaceKey}-${Exclude<TW.Colors.String, TW.Colors.Inferred>})`
		}
	}

	declare global {
		namespace T {
			type TWColors = TW.Colors.String
		}
	}
}

export {}
