/**
 * Created by alameddinc on 28.07.2018.
 */
import React, {Component} from 'react'
import {Col,Row,Button,Label,Input} from 'reactstrap'
import './First.css'

class First extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:null,
            clicked:false,
            name:"alameddince"
        }
    }
    componentDidMount(){
    }
    onClickButton = (name)=> {
    this.setState({
        isLoad:false
    })
    fetch("https://api.github.com/users/"+name)
        .then(res=>res.json())
        .then((result)=>{
            this.setState({
                dataUser:result,
            })
        })

        fetch("https://api.github.com/users/"+name+"/repos")
        .then(res=>res.json())
        .then((result)=>{
            this.setState({
                data:result,
                isLoad:true,
            })
        },(e)=>{
            this.setState({
                isLoad:true,
                error:e
            })
        })

}

    render(){
        return(
            <Row className="firstRow">

                <Col xs="12" md={{size:10,offset:1}} lg={{size:10,offset:1}} className="firstCol">
                    <h3 className="nameHead">GitHub User Repositories</h3>
                    <Row>
                        <Col lg="10">
                            <Input placeHolder="Please write an username" size="small" type="text" onChange={(e)=>{this.setState({name:e.target.value,clicked:false})}}/>
                        </Col>
                        <Col lg="2">
                            <Button onClick={()=>this.onClickButton(this.state.name)}>Search</Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:25}}>
                        <Col lg="4">
                            {this.state.isLoad && this.state.dataUser['name'] ?<img style={{width:100}} src={this.state.dataUser['avatar_url']} alt=""/>:null}
                            <table >
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] && this.state.dataUser ?"Name: "+this.state.dataUser['name']:null}</td></tr>
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] ?"Comliany: "+this.state.dataUser['company']:null}</td></tr>
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] ?"Location: "+this.state.dataUser['location']:null}</td></tr>
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] ?"Followers: "+this.state.dataUser['followers']:null}</td></tr>
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] ?"Following: "+this.state.dataUser['following']:null}</td></tr>
                                <tr><td>{this.state.isLoad && this.state.dataUser['name'] ?"Created at "+this.state.dataUser['created_at'].split("T")[0]:null}</td></tr>
                            </table>
                        </Col>
                        <Col lg="8">
                            <ul>
                                {this.state.isLoad ?listResp(this.state.data):null}
                            </ul>
                        </Col>

                    </Row>
                </Col>
            </Row>
        )
    }
}


function listResp(data) {
    let listR=[]
    for (let i=0;i<data.length;i++){
        listR.push( <li><a href={data[i].html_url}>{data[i].name}</a> - {data[i].description}</li> )
    }
    if(!data[0])
        listR.push(<li>Not Found User!</li>)
    return listR
}

export default First