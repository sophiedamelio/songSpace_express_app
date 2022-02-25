import React from 'react';
import { Link } from 'react-router-dom'
import { Header, Segment, Image, Icon, Grid } from "semantic-ui-react";
import "./Header.css"

export default function PageHeader({ user, handleLogout }) {

	return (
		<div class="whole-header">
			<Header as="h3" floated="left" textAlign="center" verticalAlign="middle" id="logo">
				<span id="logo">
					<Link to="/" id="logo">
						<Image src={"https://i.imgur.com/n5Uns60.png"} size="small"></Image>
					</Link>
				</span>
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
				<span id="greeting">
					Hello {user.username}
				</span>
				<Link to="/">
					<Icon color="black" name="home"></Icon>
				</Link>
				<Link to="" onClick={handleLogout}>
					Logout
				</Link>
			</Header>
		</div >
	)
}