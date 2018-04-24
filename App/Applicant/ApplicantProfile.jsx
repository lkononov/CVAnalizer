import React from 'react';
import ReactTable from "react-table";
import axios from 'axios';
import Cookies from 'universal-cookie';
import ApplicantCard from '../Components/ApplicantCard.jsx';
import SearchStack from '../Components/SearchStack.jsx';

export default class ApplicantProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applicantTech: [],
            data: [],
            newTechs: [],
            applicant: [],
            HaveBeenEdited: false
        }
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentWillMount() {
        let data;
        let applicant;
        data = this.props.info[0].tech; 
        applicant = this.props.info[0];
        this.setState({ data })
        this.setState({ applicant })
    }

    //Render editable data in table
    renderEditable(cellInfo) {
        return (          
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    console.log(this.state.data)
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
    //Add new technologies for applicant
    onChange = (value) => {
        if (value.length != 0) {
            let previous = this.state.data;
            let newT = this.state.newTechs;
            for (var i = 0; i < value.length; i++) {
                let x = {
                    tname: value[i].label,
                    exp: 0,
                    tid: value[i].value                    
                }           
                if (previous.find(tech => tech.tid === x.tid)) {
                }
                else {
                    previous.push(x)
                    newT.push(x)
                }
            }        
            this.setState({ data: previous });       
            this.setState({ newTechs: newT });
        }      
    }

    //Must show editable rows ??
    HandleEditClick = () => {
        if(this.state.HaveBeenEdited){
            this.setState({ HaveBeenEdited: false})
        }     
        else{
            this.setState({ HaveBeenEdited: true })
        }
        
    }

    //Render components for editing
    EditRender() {
        if (this.state.HaveBeenEdited) {
            const { data } = this.state;
            return (
                <div className="soup white">
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "Technologies",
                                accessor: "tname",
                            },
                            {
                                Header: "Experience",
                                accessor: "exp",
                                Cell: this.renderEditable
                            }
                        ]}
                        defaultPageSize={data.length}
                        className="-striped -highlight"
                    />
                    <SearchStack onChange={this.onChange.bind(this)} technologies={this.props.technologies} />
                </div>
            )
        }
        else {
            return (
                <div>
                   <div className="soup white" >
                       <h3 className="text-center">Nothifications</h3>
                       <hr />
                       <p />
                                Some super text
                    </div>
                    <div className="soup white">
                        <p />
                        <h3 className="text-center">Technologies</h3>
                        <p />

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Technology</th>
                                    <th scope="col">Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.info[0].tech.map(((tech, key) =>
                                    <tr key={key}>
                                        <th scope="row">{key}</th>
                                        <td>{tech.tname}</td>
                                        <td>{tech.exp}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="soup white">
                        <h3 className="text-center">Portfolio</h3>
                        <hr />
                        <p />
                        Applicant projects here
                    </div>
                </div>
            )
        }
    }

    HandleSave = () => {  
        let newTechnologies = this.state.newTechs;

        if (newTechnologies.length != 0) { 
            
            let NewTechStack = [];
            let z = this.state.applicant;

            for (var i = 0; i < newTechnologies.length; i++) { 
                let t = {
                    uid: z.uid,
                    tid: newTechnologies[i].tid,
                    exp: parseInt(newTechnologies[i].exp) 
                }
                NewTechStack.push(t);
            }

            this.setState({ newTechs: NewTechStack });            
            const cookies = new Cookies();
            const token = cookies.get('ID');
            const params = {NewTechStack}
            const url = `/Api/UpdateTechnologies`;
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(NewTechStack)                 
            };
            axios.post(url, params, config)
                .then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                });
        }     
    }

    render() {     
        return (
            <div >
                <div className="row justify-content-around ">

                    <ApplicantCard HandleSave={this.HandleSave} HandleEdit={this.HandleEditClick} HandleClose={this.props.HandleClose} info={this.props.info} buttons={this.state.HaveBeenEdited} />

                    <div className="col-md-8 padding">
                        {this.EditRender()}      
                    </div>
                </div>
            </div>
        );
    }
};