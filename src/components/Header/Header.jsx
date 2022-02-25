import React from 'react';
import { Link } from 'react-router-dom'
import { Header, Segment, Image, Icon, Grid } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {

	return (
		<Segment clearing>
			<Header as="h3" floated="left" textAlign="center" verticalAlign="middle">
				<Link to="/">
					logo here
				</Link>
				<Image
					src={
						user?.photoUrl
							? user?.photoUrl
							: "https://react.semantic-ui.com/images/wireframe/square-image.png"
					}
					avatar
				></Image>
			</Header>
			<Header floated="right" as="h3" textAlign="center" verticalAlign="middle">
				<span>
					Hello {user.username}
				</span>
				<Link to="/">
					<Icon color="black" name="home"></Icon>
				</Link>
				<Link to="" onClick={handleLogout}>
					Logout
				</Link>
			</Header>
		</Segment>
	)
}