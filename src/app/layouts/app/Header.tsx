/**
 * Header for App Layout.
 *
 * @returns header component
 */
export const Header: React.FC<HeaderProps> = ({
	title,
}): React.ReactElement => {
	return <header>{title}</header>;
};

interface HeaderProps {
	title: string;
}
