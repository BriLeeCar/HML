import { tCountryKeys } from '@/(Content)/map/util'
import countryPaths from '~/data/countryDataWithPaths.json'
import { MapPathEl, MapSvg } from '../(Content)/map/Map'
import { MapBtn, NowBtn, SmallBtns } from './Buttons'
import { HeadingText } from './HeadingText'
import { Img } from './SidebarImg'

const Home = async () => {
	return (
		<>
			<Img />
			<div className='relative inline-flex max-w-[70vw] flex-col items-center justify-center gap-6 self-stretch py-3 pl-0'>
				<HeadingText />
				<div className='flex flex-col items-center justify-start self-stretch px-3 pt-12 text-white italic'>
					<NowBtn />
					<SmallBtns />
				</div>
				<MapBtn />
			</div>
			<div className='absolute -top-10 -right-40 -z-1 hidden h-1/2 w-[50vw] -rotate-5 overflow-clip min-[600px]:h-screen min-[1200px]:translate-y-0 min-[1200px]:rotate-0 md:block'>
				<MapSvg className='lg:max-h-fill xl: text-primary-foreground h-auto w-screen shadow-none lg:relative lg:w-screen'>
					{countryPaths
						.filter((ea) => ea.path)
						.map((country) => {
							const { path, tier, haveData, abbr, name } = country

							return (
								<MapPathEl
									key={name}
									name={name as tCountryKeys}
									abbr={abbr}
									tier={tier || 999}
									haveData={haveData || false}
									path={path || ''}
								/>
							)
						})}
				</MapSvg>
			</div>
		</>
	)
}

export default Home
