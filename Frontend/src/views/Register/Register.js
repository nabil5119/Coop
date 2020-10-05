import React, { Component } from 'react';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import {Button, Card, CardBody, ButtonGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, TabPane,CardHeader,Collapse, TabContent, Row } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);

    this.tabPane=this.tabPane.bind(this);
    this.newMember=this.newMember.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);

    this.state = {

      API_LINK:'https://costats.ew.r.appspot.com/',

      activeTab: new Array(1).fill('1'),
      activeIndex:1,
      membersNumber:0,
      accordion: [],

      colors:[["info","light","light","light","light"]],

      Secteurs:[],
      selectedSecteur:0,
      Regions:[],
      selectedRegion:0,
      Villes:[],
      selectedVille:0,

      Profiles:[],

      newAdress:{
        idVille: '',
        codePostal:'',
        ligneAdresse:''
      },

      newAdmin: {
        nomComplet: '',
        idCooperative: '',
        idProfile: 1,
        sexe: 'Homme',
        CIN: '',
        email:'',
        telephone:''
      },

      newUser:{
        email:'',
        motDePasse: '',
        role:'user'
      },

      newCooperative:{
        nomCooperative: '',
        idSecteur:'',
        idAdresse:'',
        idRegion:''
      },

      newMembres:[],
    };
  }

  componentWillMount() {
    axios.get(this.state.API_LINK+'secteur/all')
      .then((response) =>{
        this.setState({
          Secteurs: response.data,
        })
      });
    axios.get(this.state.API_LINK+'region/all')
      .then((response) =>{
        this.setState({
          Regions: response.data,
        })
    });
    let regionId=this.state.selectedRegion+1;
    axios.get(this.state.API_LINK+'region/'+regionId+'/villes')
      .then((response) =>{
        this.setState({
          Villes: response.data,
        })
      });
    axios.get(this.state.API_LINK+'profile/all')
      .then((response) =>{
        this.setState({
          Profiles: response.data,
        })
      });
  }

  componentDidMount() {
    let user=JSON.parse(localStorage.getItem("user"));
    if(user===null){}
    else if(user.role==="admin"){
      this.props.history.push("/dashboard");
    }
    else if(user.role==="user"){
      this.props.history.push("/account");
    }
  }

  handleSecteurChange = (event) => {
    let newCooperative=this.state.newCooperative;
    newCooperative.idSecteur=this.state.Secteurs[event.target.value].id;
    this.setState({
      selectedSecteur: event.target.value,
      newCooperative: newCooperative
    });
  };
  handleRegionChange = (event) => {
    let newCooperative=this.state.newCooperative;
    this.setState({selectedRegion: event.target.value });
    const regionId=parseInt(event.target.value)+1;
    newCooperative.idRegion=regionId;
    axios.get(this.state.API_LINK+'region/'+regionId+'/villes')
      .then((response) =>{
        this.setState({
          Villes: response.data,
        })
      });
  };
  handleVilleChange = (event) => {
    let newAdress=this.state.newAdress;
    newAdress.idVille=this.state.Villes[event.target.value].id;
    this.setState({
      selectedVille: event.target.value,
      newAdress: newAdress
    });
  };

  setAdminProfileId(id){
    let colors=this.state.colors;
    colors[0]=["light","light","light","light","light"];
    colors[0][id]='info';
    let newAdmin=this.state.newAdmin;
    newAdmin.idProfile=this.state.Profiles[id].id;
    this.state.newAdmin=newAdmin;
    this.setState({colors:colors})
  }
  setMemberProfileId(idMember,idProfile) {
    let colors=this.state.colors;
    colors[parseInt(idMember)+1]=["light","light","light","light","light"];
    colors[parseInt(idMember)+1][idProfile]="info";
    let newMember=this.state.newMembres[idMember];
    newMember.idProfile=this.state.Profiles[idProfile].id;
    this.state.newMembres[idMember]=newMember;
    this.setState({colors:colors})
  }

  switchTab(i) {
    if(this.state.activeIndex>-i && this.state.activeIndex<5-i)
    {
      const newArray = this.state.activeTab.slice();
      const index=this.state.activeIndex+i;
      newArray[0] = index.toString();
      this.setState({
        activeIndex: index,
        activeTab: newArray,
      })
    }

  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;

    for(let i=0;i<prevState.length;i++) {
      prevState[i]=false;
    }
    prevState[tab]=true;

    this.setState({
      accordion: prevState,
    });
  }

  addMemberContent(n) {
    return (
        <Form>
          <Row className="mb-3 justify-content-center">
            <h5 className="ml-3 mr-2 mt-2">Le nouveau membre est un </h5>
            <ButtonGroup>
              <Button color={this.state.colors[parseInt(n)+1][0]} onClick={() => { this.setMemberProfileId(n,0); }} className="btn-outline-primary">Fondateur</Button>
              <Button color={this.state.colors[parseInt(n)+1][1]} onClick={() => { this.setMemberProfileId(n,1); }} className="btn-outline-primary">Président</Button>
              <Button color={this.state.colors[parseInt(n)+1][2]} onClick={() => { this.setMemberProfileId(n,2); }} className="btn-outline-primary">Manager</Button>
              <Button color={this.state.colors[parseInt(n)+1][3]} onClick={() => { this.setMemberProfileId(n,3); }} className="btn-outline-primary">Mandataire</Button>
              <Button color={this.state.colors[parseInt(n)+1][4]} onClick={() => { this.setMemberProfileId(n,4); }} className="btn-outline-primary">Adhérent</Button>
            </ButtonGroup>
          </Row>

          <Row className="mb-3">
            <Col xs="8">
              <h6 className="font-lg">Nom complet</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-user"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Veuillez saisir le nom complet..." onChange={(e) => {
                  this.state.newMembres[n].nomComplet = e.target.value;}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">Sexe</h6>
              <Input type="select" onChange={(e) => {
                this.state.newMembres[n].sexe = e.target.value;}}>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </Input>
            </Col>
          </Row>
          <hr/>
          <Row className="mb-3">
            <Col>
              <h6 className="font-lg">Identité (<em>optionnel</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-credit-card"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Veuillez saisir le CIN..." onChange={(e) => {
                  this.state.newMembres[n].CIN = e.target.value;}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">Adresse Email (<em>optionnel</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Veuillez saisir l'adresse email..." onChange={(e) => {
                  this.state.newMembres[n].email = e.target.value;}}/>
              </InputGroup>
            </Col>
            <Col>
              <h6 className="font-lg">N.Téléphone (<em>optionnel</em>)</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-phone"/></InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Veuillez saisir le N.Téléphone..." onChange={(e) => {
                  this.state.newMembres[n].telephone = e.target.value;}}/>
              </InputGroup>
            </Col>
          </Row>
          <br/>
        </Form>
    )
  }
  newMember(n) {
    return(
        <Card className="mb-0">
          <CardHeader id="headingOne">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(n)}>
              <h5 className="m-0 p-0">Member {(n+1).toString()}</h5>
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[n]}>
            <CardBody>
              {this.addMemberContent(n)}
            </CardBody>
          </Collapse>
        </Card>
    )
  }
  createMembers(n) {
    let newMembers=this.state.newMembres;
    let colors=this.state.colors;
    let members=[];
    let newAccordion=this.state.accordion;
    for(let i=0;i<n;i++)
    {
      if(newMembers.length<n)
      {
        newMembers.push({
          nomComplet: '',
          idCooperative: '',
          idProfile: 4,
          sexe: 'Homme',
          CIN: '',
          email:'',
          telephone:''})
        colors.push(["light","light","light","light","info"]);
        newAccordion.push(false)
        newAccordion[0]=true;
      }


      members.push(this.newMember(i));
    }

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.accordion=newAccordion;
    this.state.newMembres=newMembers;
    return members;
  }

  submitAll(){
    const link=this.state.API_LINK;

    let newAdress=this.state.newAdress;
    let newCooperative=this.state.newCooperative;
    let newAdmin=this.state.newAdmin;
    let newMembers=this.state.newMembres;
    let newUser=this.state.newUser;

    newUser.motDePasse=(sha256(newUser.motDePasse));

    newAdress.idVille=this.state.Villes[this.state.selectedVille].id;
    newCooperative.idSecteur=this.state.Secteurs[this.state.selectedSecteur].id;
    newCooperative.idRegion=this.state.Regions[this.state.selectedRegion].id;
    axios.post(link+'adresse/create/',newAdress).then((response)=>{
      const idAdresse=response.data;
      newCooperative.idAdresse=idAdresse;
      axios.post(link+'cooperative/create/',newCooperative).then((response)=>{
        const idCooperative=response.data;
        newMembers.push(newAdmin);
        newMembers.forEach(element=> {
          element.idCooperative=idCooperative
          axios.post(link+'membre/create/',element).then((response)=>{})
        })

      })
    })
    axios.post(link+'user/create/',newUser).then((response)=>{})
  }


  tabPane() {
    return (
        <>
          <TabPane tabId="1">
              <Form>
                <h1>Demande d'inscription</h1>
                <hr/>
                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Coopérative</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-user"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Veuillez saisir le nom de votre coopérative..." onChange={(e) => {
                        this.state.newCooperative.nomCooperative = e.target.value;}}/>
                    </InputGroup>
                  </Col>
                </Row>

                <hr/>

                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Adresse</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-location-pin"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Veuillez saisir l'adresse de votre coopérative..." onChange={(e) => {
                        this.state.newAdress.ligneAdresse = e.target.value;}}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <h6 className="font-lg">Code postal</h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="icon-envelope"/></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Veuillez saisir le Code postal..." onChange={(e) => {
                        this.state.newAdress.codePostal = e.target.value;}}/>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <h6 className="font-lg">Région</h6>
                    <Input type="select" onChange={this.handleRegionChange}>
                      {this.state.Regions.map((region, index)=>
                      {
                        return <option key={index} value={index}>{region.nomRegion}</option>
                      })}
                    </Input>
                  </Col>
                  <Col>
                    <h6 className="font-lg">Ville</h6>
                    <Input type="select" onChange={this.handleVilleChange}>
                      {this.state.Villes.map((ville, index)=>
                      {return <option key={index} value={index}>{ville.nomVille}</option>})}
                    </Input>
                  </Col>
                </Row>

                <hr/>

                <Row>
                  <Col>
                    <h6 className="font-lg">Secteur</h6>
                    {/* eslint-disable-next-line no-restricted-globals */}
                    <Input type="select" onChange={this.handleSecteurChange}>
                      {this.state.Secteurs.map((secteur, index)=>
                      {
                        return <option value={index}>{secteur.nomSecteur}</option>
                      })}
                    </Input>
                  </Col>
                  <Col>
                    <h6 className="font-lg">Nombre d'adhérents</h6>
                    <Input type="text" placeholder="Veuillez saisir le nombre total d'adhérents..." onChange={(e)=>{
                      let i=e.target.value;
                      this.setState({membersNumber:i,})
                    }}/>
                  </Col>
                </Row>
                <br/>
              </Form>
          </TabPane>

          <TabPane tabId="2">
            <Form>
              <h1>Demande d'inscription</h1>
              <hr/>

              <Row className="mb-3 justify-content-center">
                <h5 className="ml-3 mr-2 mt-2">Je suis le </h5>
                <ButtonGroup>
                  <Button color={this.state.colors[0][0]} onClick={() => { this.setAdminProfileId(0); }} className="btn-outline-primary">Fondateur</Button>
                  <Button color={this.state.colors[0][1]} onClick={() => { this.setAdminProfileId(1); }} className="btn-outline-primary">Président</Button>
                  <Button color={this.state.colors[0][2]} onClick={() => { this.setAdminProfileId(2); }} className="btn-outline-primary">Manager</Button>
                  <Button color={this.state.colors[0][3]} onClick={() => { this.setAdminProfileId(3); }} className="btn-outline-primary">Mandataire</Button>
                </ButtonGroup>
              </Row>

              <Row className="mb-3">
                <Col>
                  <h6 className="font-lg">Nom complet</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-user"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Veuillez saisir votre nom complet..." onChange={(e) => {
                      this.state.newAdmin.nomComplet = e.target.value;}} />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <h6 className="font-lg">Identité</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-credit-card"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Veuillez saisir votre CIN..." onChange={(e) => {
                      this.state.newAdmin.CIN = e.target.value;}}  />
                  </InputGroup>
                </Col>
                <Col>
                  <h6 className="font-lg">Sexe</h6>
                  <Input type="select" onChange={(e) => {this.state.newAdmin.sexe = e.target.value;}} >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </Input>
                </Col>
              </Row>

              <hr/>
              <Row>
                <Col>
                  <h6 className="font-lg">Adresse Email</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Veuillez saisir l'adresse de votre adresse email..." onChange={(e) => {
                      this.state.newAdmin.email = e.target.value;
                      this.state.newUser.email=e.target.value;
                    }}/>
                  </InputGroup>
                </Col>
                <Col>
                  <h6 className="font-lg">N.Téléphone</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-phone"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Veuillez saisir votre numéro de téléphone..." onChange={(e) => {
                      this.state.newAdmin.telephone = e.target.value;}} />
                  </InputGroup>
                </Col>
              </Row>
              <hr/>
              <Row className="mt-3">
                <Col>
                  <h6 className="font-lg">Mot de Passe</h6>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="icon-user"/></InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Veuillez saisir un mot de passe..." onChange={(e) => {
                      this.state.newUser.motDePasse=e.target.value;
                    }}/>
                  </InputGroup>
                </Col>
              </Row>

              <br/>
            </Form>
          </TabPane>

          <TabPane tabId="3">
            <h1>Demande d'inscription</h1>
            <hr/>
            <CardBody>
              <div>
                {this.createMembers(this.state.membersNumber-1)}
              </div>
            </CardBody>
          </TabPane>

          <TabPane tabId="4">
            <h1>Demande d'inscription</h1>
            <hr/>
            <CardBody>
              <div className="text-center">
                <h3>Merci d'avoir soumis votre demande d'inscription sur notre plateforme, pouvez-vous s'il vous plaît confirmer les données que vous avez saisies ?</h3>
                <br/>
                <Button color="white" href="#/home" className="px-4 mx-5 btn btn-outline-danger">Annuler</Button>
                <Button color="white" href="#/login" onClick={() => { this.submitAll(); }}  className="px-3 mx-5 btn btn-outline-success">Comfirmer</Button>
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
              <Card className="mx-4" >
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

export default Register;
