//import AddComposition from "../AddComposition/AddComposition"
import { useState, useEffect } from "react"
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import AddCompositionPage from "../../pages/AddCompositionPage/AddCompositionPage"
import Composition from '../Composition/Composition';
import CompositionButton from "../CompositionButton/CompositionButton"
import * as compositionApi from "../../utils/compositionApi"
import { Route, Routes } from 'react-router-dom';


export default function Menu({ user, handleAddComposition, getCompositions, compositions }) {
	//console.log(user, handleAddComposition, "<--- props on menu")
	//console.log(compositions, "<--- compositions on menu")
	//console.log(handleCompositionSelection, "<--- handle com selection")

	//const [selectedComposition, setSelectedComposition] = useState('')
	const [error, setError] = useState('')
	// set selected composition state here, then send to composition component

	//toggle feature, boolean if else (render based on true or false) <-- from arthur
	//function handleChange(e) {
	//	setSelectedComposition({
	//		...selectedComposition,
	//		[e.target.name]: e.target.value
	//	})
	//}

	//async function handleCompositionSelection(composition) {
	//	try {
	//		//e.preventDefault()
	//		//console.log(e.currentTarget, "<--- e.ytarget in handle funct")
	//		//const data = e.target.value
	//		//console.log(data, "<--- composition in handle func")
	//		//const composition = new FormData()
	//		//composition.append('composition', selectedComposition);
	//		//for (let key in selectedComposition) {
	//		//	composition.append(key, selectedComposition[key])
	//		//}
	//		//console.log(composition.forEach((item) => console.log(item)), "<--- form data, composition")
	//		//const data = await compositionApi.setComposition(composition)
	//		//console.log(data, "<-- data from the handlecompositionselection")
	//		//getCompositions()
	//		//setSelectedComposition(composition)
	//		alert('Hello!')
	//	} catch (err) {
	//		setError(err.message)
	//	}
	//	//return (
	//	//	<Composition composition={composition} />
	//	//)
	//}

	//useEffect(() => {
	//	handleCompositionSelection()
	//}, [])
	const [selectedComposition, setSelectedComposition] = useState('')


	function selectComposition(e) {
		e.preventDefault()
		setSelectedComposition(e.target) // comp that was clicked on
		//console.log(e.target, "<-- e in select comp, in comp button")
		//console.log(selectedComposition, "<-- selected comp in menu")
	}


	return (
		<>
			<h1>menu!</h1>
			<Grid columns="two" divided>
				<Grid.Row>
					<Grid.Column>

						{compositions ?
							<>
								{compositions.map((composition) => {
									return (
										<ul>
											{/*//<Link to="/:comp_id">*/}
											{/*// when you click on one of these, it should display in full in the composition component (update the composition component)
							// onclick of a sem UI (like Card,content) could be a function that updates the composition comp?*/}
											<li key={composition._id}><CompositionButton composition={composition} key={composition._id} selectComposition={selectComposition} /></li>
											{/*//</Link>*/}
										</ul>
									)
								})}
							</>
							: null}
						<Link to="/addComposition">
							Add Composition
						</Link>
					</Grid.Column>
					<Grid.Column>
						<Composition selectedComposition={selectedComposition} selectComposition={selectComposition} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
}