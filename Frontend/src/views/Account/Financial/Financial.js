import React, { Component } from 'react';
import axios from 'axios';
import {Button, Card, CardBody, ButtonGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, TabPane,CardHeader,Collapse, TabContent, Row } from 'reactstrap';

class Activity extends Component {
    constructor(props) {
        super(props);

        this.tabPane=this.tabPane.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.toggleAccordion = this.toggleAccordion.bind(this);

        this.state = {

            API_LINK:'https://costats.ew.r.appspot.com/',

            idCooperative:0,
            annee:0,

            activeTab: new Array(1).fill('1'),
            activeIndex:1,
            accordion: [
                [false],
                [false]
            ],

            newRevenus:[],
            newPertes:[],

            numbers:new Array(2).fill(0),
        };
    }

    componentDidMount() {
        let user=JSON.parse(localStorage.getItem("user"));
        if(user===null){
            this.props.history.push("/login");
        }
        else if(user.role==="admin"){
            this.props.history.push("/dashboard");
        }
        else{
            if(new URLSearchParams(this.props.location.search).get("year")===null)
            {
                this.props.history.push("/account");
            }
            axios.get(this.state.API_LINK+"user/"+user.id+"/cooperative")
                .then((response)=>{
                    this.setState({
                        idCooperative: response.data,
                        annee:new URLSearchParams(this.props.location.search).get("year"),
                    })
                })
        }
    }

    switchTab(i) {
        if(this.state.activeIndex>-i && this.state.activeIndex<5-i) {
            const newArray = this.state.activeTab.slice();
            const index = this.state.activeIndex + i;
            newArray[0] = index.toString();
            this.setState({
                activeIndex: index,
                activeTab: newArray,
            })
            console.log(this.state.numbers);
        }
    }

    toggleAccordion(tab,index) {
        const prevState = this.state.accordion;

        for(let i=0;i<prevState[0].length;i++) {
            prevState[tab][i]=false;
        }
        console.log(prevState);
        prevState[tab][index]=true;

        this.setState({
            accordion: prevState,
        });
    }

    newPerte(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1,n)}>
                        <h5 className="m-0 p-0">Perte {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Motif du perte</h6>
                                    <Input type="text" placeholder="Veuillez saisir le motif du perte..." onChange={(e) => {
                                        this.state.newPertes[n].motifPerte = e.target.value;}}/>
                                </Col>
                                <Col xs="4">
                                    <h6 className="font-lg">Somme perdue (<i>DH</i>)</h6>
                                    <Input type="text" placeholder="Veuillez saisir la somme perdue..." onChange={(e) => {
                                        this.state.newPertes[n].sommePerdue = e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createPertes(n) {
        let newPertes=this.state.newPertes;
        let pertes=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newPertes.length<n)
            {
                newPertes.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    motifPerte:'',
                    sommePerdue:'',
                })
            }

            pertes.push(this.newPerte(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[1]=newAccordion;
        this.state.newPertes=newPertes;
        return pertes;
    }

    newRevenu(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0,n)}>
                        <h5 className="m-0 p-0">Revenu {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Motif du revenu</h6>
                                    <Input type="text" placeholder="Veuillez saisir le motif du revenu..." onChange={(e) => {
                                        this.state.newRevenus[n].sourceRevenue = e.target.value;}}/>
                                </Col>
                                <Col xs="4">
                                    <h6 className="font-lg">Somme gagnée (<i>DH</i>)</h6>
                                    <Input type="text" placeholder="Veuillez saisir la somme gagnée..." onChange={(e) => {
                                        this.state.newRevenus[n].sommeGagnee = e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createRevenus(n) {
        let newRevenus=this.state.newRevenus;
        let revenus=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newRevenus.length<n)
            {
                newRevenus.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    sourceRevenue:'',
                    sommeGagnee:'',
                })
            }
            revenus.push(this.newRevenu(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[0]=newAccordion;
        this.state.newRevenus=newRevenus;
        return revenus;
    }

    submitAll() {
        let newRevenus=this.state.newRevenus;
        let newPertes=this.state.newPertes;
        newRevenus.forEach(element=>{axios.post(this.state.API_LINK+'revenu/create/',element).then((response)=>{})})
        newPertes.forEach(element=>{axios.post(this.state.API_LINK+'perte/create/',element).then((response)=>{})})
        const rapport={
            annee:this.state.annee,
            idUser:JSON.parse(localStorage.getItem("user")).id,
            type:'fin',
        }
        axios.post(this.state.API_LINK+'rapport/create/',rapport).then((response)=>{})

    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Form >
                        <h1>Rapport financier</h1>
                        <hr/>
                        <Row className="text-center">
                            <Col xs="3"/>
                            <Col>
                                <h6 className="font-lg">Nombre de source de Revenus</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[0]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Nombre de source ou Pretes</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[1]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                            </Col>
                            <Col xs="3"/>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane tabId="2">
                    <Form>
                        <h1>Rapport financier</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createRevenus(this.state.numbers[0])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="3">
                    <Form>
                        <h1>Rapport financier</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createPertes(this.state.numbers[1])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="4">
                    <h1>Rapport financier</h1>
                    <hr/>
                    <CardBody>
                        <div className="text-center">
                            <h3>Merci d'avoir rempli votre rapport financier pour cette année, pouvez-vous s'il vous plaît confirmer les données que vous avez saisies ?</h3>
                            <br/>
                            <Button color="white" href="#/account" className="px-4 mx-5 btn btn-outline-danger">Annuler</Button>
                            <Button color="white" href="#/account" onClick={() => { this.submitAll(); }} className="px-3 mx-5 btn btn-outline-success">Comfirmer</Button>
                        </div>
                    </CardBody>
                </TabPane>
            </>
        );
    }

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>

                    <Row className="mt-n2 mb-2 justify-content-center">
                        <Col>
                            <div className="text-center">
                                <Button className="px-4 btn btn-primary" onClick={() => { this.switchTab(-1); }}>Prev</Button>
                                <Button className="px-4 btn btn-primary">{this.state.activeIndex}/4</Button>
                                <Button className="px-4 btn btn-primary" onClick={() => { this.switchTab(+1); }}>Next</Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <Card className="mx-5" >
                                <TabContent activeTab={this.state.activeTab[0]}>
                                    {this.tabPane()}
                                </TabContent>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Activity;
