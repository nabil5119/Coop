import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import axios from "axios";

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

            newFormations:[],
            FormationsVilles:[],
            newProduct:[],
            newEvent:[],
            EventVilles:[],
            newComm:[],
            CommCanals:[],
            newAssembly:[],

            activeTab: new Array(1).fill('1'),
            activeIndex:1,
            accordion: [
                [false],
                [false],
                [false],
                [false],
                [false]],
            numbers:new Array(5).fill(0),

            Villes:[],
            CanalComm:[]
        };
    }

    componentWillMount() {
        axios.get(this.state.API_LINK+'ville/all')
            .then((response) => {
                this.setState({
                    Villes: response.data,
                })
            });
        axios.get(this.state.API_LINK+'canalComm/all')
            .then((response) => {
                this.setState({
                    CanalComm: response.data,
                })
            });
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
        if(this.state.activeIndex>-i && this.state.activeIndex<8-i) {
            const newArray = this.state.activeTab.slice();
            const index=this.state.activeIndex+i;
            newArray[0] = index.toString();
            this.setState({
                activeIndex: index,
                activeTab: newArray,
            })
        }
    }

    toggleAccordion(tab,index) {
        const prevState = this.state.accordion;

        for(let i=0;i<prevState[0].length;i++) {
            prevState[tab][i]=false;
        }
        prevState[tab][index]=true;

        this.setState({
            accordion: prevState,
        });
    }

    handleFormationVilleChange = (event,n) => {
        this.state.FormationsVilles[n]=parseInt(event.target.value) + 1;
    };
    handleEventVilleChange = (event,n) => {
        this.state.EventVilles[n]=parseInt(event.target.value) + 1;
    };
    handleCanalChange = (event,n) => {
        this.state.CommCanals[n]=parseInt(event.target.value) + 1;
    };

    newFormation(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0,n)}>
                        <h5 className="m-0 p-0">Formation {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Sujet de la formation</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Veuillez saisir le sujet de la formation..." onChange={(e) => {
                                            this.state.newFormations[n].sujetFormation= e.target.value;}}/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">Ville</h6>
                                    <Input type="select" onChange={e=>this.handleFormationVilleChange(e,n)}>
                                        {this.state.Villes.map((ville, index)=>
                                        {return <option key={index} value={index}>{ville.nomVille}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Date de début</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newFormations[n].dateDebut= e.target.value;}}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">Date de fin</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newFormations[n].dateFin= e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createFormations(n) {
        let newCreate=this.state.newFormations;
        let formation=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    idVille:'',
                    sujetFormation:'',
                    dateDebut:'',
                    dateFin:'',
                })
                this.state.FormationsVilles.push(1);
            }
            formation.push(this.newFormation(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[0]=newAccordion;
        this.state.newFormations=newCreate;
        return formation;
    }

    newProduction(n) {
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1,n)}>
                        <h5 className="m-0 p-0">Produit/Service {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="6">
                                    <h6 className="font-lg">Nom du Produit/Service</h6>
                                    <Input type="text" placeholder="Veuillez saisir le nom du Produit/Service..." onChange={(e) => {
                                        this.state.newProduct[n].nomProduit= e.target.value;}}/>
                                </Col>
                                <Col xs="6">
                                    <h6 className="font-lg">Quantité Vendu/Servie</h6>
                                    <Input type="text" placeholder="Veuillez saisir la Quantité Vendu/Servie..." onChange={(e) => {
                                        this.state.newProduct[n].qteProduit= e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createProduction(n) {
        let newCreate=this.state.newProduct;
        let production=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    nomProduit:'',
                    qteProduit:'',
                })
            }
            production.push(this.newProduction(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[1]=newAccordion;
        this.state.newProduct=newCreate;
        return production;
    }

    newEvenement(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2,n)}>
                        <h5 className="m-0 p-0">Evènement {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[2][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Sujet de l'evènement</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Veuillez saisir le sujet de l'evènement..." onChange={(e) => {
                                            this.state.newEvent[n].sujetEvenement= e.target.value;}}/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">Ville</h6>
                                    <Input type="select" onChange={e=>this.handleEventVilleChange(e,n)}>
                                        {this.state.Villes.map((ville, index)=>
                                        {return <option key={index} value={index}>{ville.nomVille}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Date de début</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newEvent[n].dateDebut= e.target.value;}}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">Date de fin</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newEvent[n].dateFin= e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createEvenement(n){
        let newCreate=this.state.newEvent;
        let evenement=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    idVille:'',
                    sujetEvenement:'',
                    dateDebut:'',
                    dateFin:'',
                })
                this.state.EventVilles.push(1);
            }
            evenement.push(this.newEvenement(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[2]=newAccordion;
        this.state.newEvent=newCreate;
        return evenement;
    }

    newCommunication(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3,n)}>
                        <h5 className="m-0 p-0">Canal de communication {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[3][n]}>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col xs="6">
                                    <h6 className="font-lg">Nombre d'utilisation annuel</h6>
                                    <Input type="text" placeholder="Combien de fois vous avez utilisé ce canal..."onChange={(e) => {
                                        this.state.newComm[n].nombreUtilisationAnnuel= e.target.value;}}/>
                                </Col>
                                <Col sx="6">
                                    <h6 className="font-lg">Canal de communication</h6>
                                    <Input type="select" onChange={e=>this.handleCanalChange(e,n)}>
                                        {this.state.CanalComm.map((canal, index)=>
                                        {return <option key={index} value={index}>{canal.nomCanalComm}</option>})}
                                    </Input>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createCommunication(n) {
        let newCreate=this.state.newComm;
        let communication=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    idCanalComm:'',
                    nombreUtilisationAnnuel:'',
                })
                this.state.CommCanals.push(1);
            }
            communication.push(this.newCommunication(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[3]=newAccordion;
        this.state.newComm=newCreate;
        return communication;
    }

    newAssemble(n){
        return(
            <Card className="mb-0">
                <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4,n)}>
                        <h5 className="m-0 p-0">Assemblée {(n+1).toString()}</h5>
                    </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[4][n]}>
                    <CardBody>
                        <Form>
                            <Row className="mb-3">
                                <Col xs="8">
                                    <h6 className="font-lg">Motif de l'assemblée</h6>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="icon-user"/></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" placeholder="Veuillez saisir le motif de l'assemblée..." onChange={(e) => {
                                            this.state.newAssembly[n].motifAssemblee= e.target.value;}}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="mb-3">
                                <Col>
                                    <h6 className="font-lg">Date de début</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newAssembly[n].dateDebut= e.target.value;}}/>
                                </Col>
                                <Col>
                                    <h6 className="font-lg">Date de fin</h6>
                                    <Input type="date" placeholder="date" onChange={(e) => {
                                        this.state.newAssembly[n].dateFin= e.target.value;}}/>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Collapse>
            </Card>
        )
    }
    createAssemble(n){
        let newCreate=this.state.newAssembly;
        let assemble=[];
        let newAccordion=[];
        for(let i=0;i<n;i++)
        {
            if(newCreate.length<n)
            {
                newCreate.push({
                    idCooperative:this.state.idCooperative,
                    annee:this.state.annee,
                    motifAssemblee:'',
                    dateDebut:'',
                    dateFin:'',
                })
            }
            assemble.push(this.newAssemble(i));
            newAccordion.push(false);
        }
        newAccordion[0]=true;
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.accordion[4]=newAccordion;
        this.state.newAssembly=newCreate;
        return assemble;
    }

    submitAll(){
        let newFormations=this.state.newFormations;
        let newProduct=this.state.newProduct;
        let newEvent=this.state.newEvent;
        let newComm=this.state.newComm;
        let newAssembly=this.state.newAssembly;


        console.log(newFormations);
        console.log(newProduct);
        console.log(newEvent);
        console.log(newComm);
        console.log(newAssembly);


        let indexFormation=0;
        newFormations.forEach(element=>{
            element.idVille=this.state.FormationsVilles[indexFormation];
            indexFormation++;
            axios.post(this.state.API_LINK+'formation/create/',element).then((response)=>{})})

        newProduct.forEach(element=>{axios.post(this.state.API_LINK+'produit/create/',element).then((response)=>{})})

        let indexEvent=0;
        newEvent.forEach(element=>{
            element.idVille=this.state.EventVilles[indexEvent];
            indexEvent++;
            axios.post(this.state.API_LINK+'evenement/create/',element).then((response)=>{})})

        let indexComm=0;
        newComm.forEach(element=>{
            element.idCanalComm=this.state.CommCanals[indexComm];
            indexComm++;
            axios.post(this.state.API_LINK+'communication/create/',element).then((response)=>{})})

        newAssembly.forEach(element=>{axios.post(this.state.API_LINK+'assemblee/create/',element).then((response)=>{})})

        const rapport={
            annee:this.state.annee,
            idUser:JSON.parse(localStorage.getItem("user")).id,
            type:'act',
        }
        axios.post(this.state.API_LINK+'rapport/create/',rapport).then((response)=>{})

    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Form >
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <Row className="text-center">
                            <Col xs="3"/>
                            <Col>
                                <h6 className="font-lg">Nombre de formations</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[0]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Nombre de produit ou service</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[1]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Nombre d'evènement</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[2]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Nombre de canaux de communications</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[3]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                                <hr/>
                                <h6 className="font-lg">Nombre d'assemblées générales</h6>
                                <Input className="text-center" type="text" placeholder="0" onChange={(e)=>{
                                    let newNumbers=this.state.numbers;
                                    newNumbers[4]=e.target.value;
                                    this.setState({numbers:newNumbers,})}}/>
                            </Col>
                            <Col xs="3"/>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane tabId="2">
                    <Form>
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createFormations(this.state.numbers[0])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="3">
                    <Form>
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createProduction(this.state.numbers[1])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="4">
                    <Form>
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createEvenement(this.state.numbers[2])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="5">
                    <Form>
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createCommunication(this.state.numbers[3])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="6">
                    <Form>
                        <h1>Rapport d'activité</h1>
                        <hr/>
                        <CardBody>
                            <div>
                                {this.createAssemble(this.state.numbers[4])}
                            </div>
                        </CardBody>
                    </Form>
                </TabPane>

                <TabPane tabId="7">
                    <h1>Rapport d'activité</h1>
                    <hr/>
                    <CardBody>
                        <div className="text-center">
                            <h3>Merci d'avoir rempli votre rapport d'activité pour cette année, pouvez-vous s'il vous plaît confirmer les données que vous avez saisies ?</h3>
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
                                <Button className="px-4 btn btn-primary">{this.state.activeIndex}/7</Button>
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
