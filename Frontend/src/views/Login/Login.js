import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state= {
      API_LINK:'https://costats.ew.r.appspot.com/',

      user:{
        id:'',
        email:'',
        motDePasse: '',
        role:''
      },
    }

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

  LogIn(){
    const link=this.state.API_LINK;
    const user=this.state.user;

    user.motDePasse=sha256(user.motDePasse);
    axios.post(link+'user/login/',user).then((response)=>{
      if(response.data!==""){
        this.props.handleLogin(response.data);
        if(response.data.role==="admin")
        this.props.history.push("/dashboard");
        if(response.data.role==="user")
        this.props.history.push("/account");
      }
    })
  }

  render() {
    return (
      <div className="flex-row align-items-center" Style="margin-top: 18vh;" >
        <Container >
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Connectez-vous à votre compte</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="Email" onChange={(e) => {
                          this.state.user.email = e.target.value;}}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Mot de passe" autoComplete="current-password" onChange={(e) => {
                          this.state.user.motDePasse = e.target.value;}}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="white" onClick={() => { this.LogIn(); }} className="px-4 btn btn-outline-primary">Connexion</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>S'inscrire</h2>
                      <p>Vous êtes une nouvelle coopérative et vous souhaitez créer un compte sur notre plateforme?
                      </p>
                      <Link to="/register">
                        <Button href="#/Register" color="primary" className="btn btn-outline-dark mt-3">Soumettre une demande d'inscription</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
