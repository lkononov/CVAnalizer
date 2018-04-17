import React from 'react';

export default class ApplicantCard extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            shouldBeStepBack: false,
        }
    }

    HandleClose = () => {
        this.props.HandleClose();
    }

    HandleEdit = () => {
        this.props.HandleEdit();
    }

    HandleSave = () => {
        this.props.HandleSave();
    }

    RenderOrGetBack = () => {
        if (this.props.buttons) {
            return (
                <div>
                    <button onClick={this.HandleEdit} className="btn btn-outline-primary width_sto">Close Editing</button>
                    <button onClick={this.HandleSave} className="btn btn-outline-primary width_sto">Save changes</button>
                </div>
            )
        }
        else {
            return (
                <button onClick={this.HandleEdit} className="btn btn-outline-warning width_sto">Edit Profile</button>
            )        
        }
    }

    render() {
        return (
            <div className="col-md-3 soup white statick sticky-top">
                <div className="main">
                    <img src="images/1.jpg" className="rounded width_sto" alt="Cinque Terre" />
                    <hr />
                </div>
                <div className="text-center">
                    <h3>{this.props.info[0].name} {this.props.info[0].sname}</h3>
                    Junior Java developer
                    <p />Wroclaw
                    
               </div>
                    {this.RenderOrGetBack()}
                    <button onClick={this.HandleClose} className="btn btn-outline-danger width_sto">Close Profile</button>                
            </div>   
        );
    }
};