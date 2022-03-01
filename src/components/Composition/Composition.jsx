import React, { useState, createRef } from 'react';
import { Modal, Rail, Ref, Segment, Sticky, Grid } from 'semantic-ui-react';

import UpdateComposition from '../UpdateCompositionForm/UpdateCompositionForm';

import "./Composition.css";

export default function Composition(props) {

	const [open, setOpen] = useState(false)

	console.log(props, "<--- props in composition component")

	//============================================
	//	let scrollerID;
	//let paused = true;
	//let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow
	//let interval = speed * 5;

	//function startScroll(){
	//    let id = setInterval(function() {
	//        window.scrollBy(0, 2);
	//        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	//            // Reached end of page
	//            stopScroll();
	//        }
	//    }, interval);
	//    return id;
	//}

	//function stopScroll() {
	//    clearInterval(scrollerID);
	//}

	let scrollerID;
	let paused = true;
	let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow
	let interval = speed * 5;

	function startPageScroll() {
		let id = setInterval(function () {
			window.scrollBy(0, 2);
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				// Reached end of page
				stopPageScroll();
			}
		}, interval);
		return id;
	}

	function stopPageScroll() {
		clearInterval(scrollerID);
	}

	const scrollButton = document.getElementById('start-scroll-button')

	scrollButton.addEventListener('click', function (event) {
		//if (event.which == 13 || event.keyCode == 13) {
		// It's the 'Enter' key
		if (paused == true) {
			scrollerID = startPageScroll();
			paused = false;
		}
		else {
			stopPageScroll();
			paused = true;
		}
		//}
	}, true);

	//============================================

	// use state for autoscroll ?
	// initial is false
	// onclick of start button set to true, vice versa
	// when scroll = false call stopScroll(), vice versa

	// or if keep like this, the startscroll() needs to be stopped somehow
	// currently stopScroll() never gets hit (return statement?)
	const contextRef = createRef()

	// this creates a default selected composition, if there are compositions
	if (!props.selectedComposition && props.compositions) {
		props.selectComposition(props.compositions[0])
	}

	if (props.selectedComposition) {
		return (
			<div id="composition">
				<Grid columns={2}>
					<Grid.Row>
						<Ref innerRef={contextRef}>
							<Segment id="segment-composition" style={{ backgroundColor: '#3a3b42', border: 'none' }}>
								<Grid.Column>
									<div key={props.selectedComposition._id}>
										<div id="comp-header">
											<span><h3 id="title">{props.selectedComposition.title}</h3></span>
										</div>
										{props.selectedComposition.capo ? <p>Capo: {props.selectedComposition.capo}</p> : null}
										<p>{props.selectedComposition.text}</p>
										{props.selectedComposition.notes ?
											<p id="notes"><span id="notes-label">notes: <br></br></span>{props.selectedComposition.notes}</p>
											: null}
										<Modal
											style={{ borderRadius: "20px" }}
											onClose={() => setOpen(false)}
											onOpen={() => setOpen(true)}
											open={open}
											trigger={<button id="edit-comp-btn">edit composition</button>}>
											<Modal.Header style={{ backgroundColor: "#1f2024", color: "white", fontFamily: "'Major Mono Display', monospace" }}>Edit - {props.selectedComposition.title}</Modal.Header>
											<Modal.Content style={{ backgroundColor: "#3a3b42" }}>
												<UpdateComposition setOpen={setOpen} {...props}></UpdateComposition>
											</Modal.Content>
										</Modal>
										{/* I use .bind so that I can pass an argument into the handleDeleteComposition function inline */}
										<button id="delete-comp-btn" onClick={props.handleDeleteComposition.bind(null, props.selectedComposition._id)}>Delete Composition</button>
									</div>
								</Grid.Column>
								<Grid.Column>
									<Rail position="right">
										<Sticky context={contextRef}>
											<button id="start-scroll-button" onClick={startPageScroll}>start auto-scroll</button>
											<button id="stop-scroll-button" onClick={stopPageScroll}>stop auto-scroll</button>
										</Sticky>
									</Rail>
								</Grid.Column>
							</Segment>
						</Ref>
					</Grid.Row>
				</Grid>
			</div >
		)
	}
	return null;
}