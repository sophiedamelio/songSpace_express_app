//import AddComposition from "../AddComposition/AddComposition"
import { useState } from "react"
import { Button, Grid, Modal } from 'semantic-ui-react';
import Composition from '../Composition/Composition';
import CompositionButton from "../CompositionButton/CompositionButton"
import AddCompositionForm from "../CompositionForm/CompositionForm";
import "./Menu.css"


export default function Menu({ user, handleAddComposition, compositions, handleUpdateComposition, handleDeleteComposition }) {

	//console.log(handleAddComposition, "<-- handleadd comp in menu")

	const [error, setError] = useState('')
	const [selectedComposition, setSelectedComposition] = useState('')
	const [open, setOpen] = useState(false)

	// set selected composition state here, then send to composition component
	function selectComposition(composition) {
		setSelectedComposition(composition) // comp that was clicked on
	}

	console.log(selectedComposition, "<_-== selected comp")

	return (
		<div class="whole-page">
			<h1 id="home-title">menu!</h1>
			<Grid columns="two" divided>
				<Grid.Row>
					<Grid.Column width="4">
						{compositions ?
							<>
								<ul>
									{compositions.map((composition) => {
										return (
											<li key={composition._id} >
												<CompositionButton composition={composition} selectComposition={selectComposition} />
											</li>
										)
									})}
								</ul>
							</>
							: null}

						<Modal
							onClose={() => setOpen(false)}
							onOpen={() => setOpen(true)}
							open={open}
							trigger={<Button>Add composition</Button>}>
							<Modal.Header>Add a Composition</Modal.Header>
							<Modal.Content>
								<AddCompositionForm handleAddComposition={handleAddComposition}></AddCompositionForm>
								<Modal.Actions>
									<Button content="Close Create Mode" onClick={() => setOpen(false)} />
								</Modal.Actions>
							</Modal.Content>
						</Modal>
					</Grid.Column>
					<Grid.Column width="12">
						<Composition selectedComposition={selectedComposition} user={user} compositions={compositions} handleUpdateComposition={handleUpdateComposition} handleDeleteComposition={handleDeleteComposition} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}