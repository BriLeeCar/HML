import { createContext, ReactNode } from 'react';

type UserPrefs = {
	theme?: 'light' | 'dark';
	favorites: string[];
	bookmarks: string[];
};
export const UserContext = createContext<UserPrefs>({
	favorites: [],
	bookmarks: [],
});

export const Providers = ({children}: {children: ReactNode}) => {
    <UserContext.Provider value={{favorites: [], bookmarks: []}}>
        {children}
    </UserContext.Provider>
}