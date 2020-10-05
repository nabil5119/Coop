import React, { Component} from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import thumbnail from "../../assets/img/Home/Thumbnail.png";

class Home extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="pt-5 mt-5">
          <Col>
            <Row>
              <Col xs="1"/>
              <Col><h1 className="text-center font-weight-bold">Savoir tout sur votre coopérative!</h1></Col>
              <Col xs="1"/>
            </Row>
            <Row>
              <h3 class="text-center font-weight-light">Notre nouvel system vous aidera à bien gérer vos coopératives en vous fournissant
                des indicateurs et des rapports bien détails sur l'état de ces dernières.</h3><br/>
            </Row>
            <Row>
              <img src={thumbnail} className="img-fluid" alt="Thumbnail"/>
            </Row>
          </Col>

          <Col>
            <Card className="mt-5">
              <CardBody>
                <Row>
                  <Col xs="1"/>
                  <Col><h5 className="text-center">Vous êtes une nouvelle coopérative et vous souhaitez créer un compte sur notre plateforme?<br/>
                  <br/><a href="#/register" role="button" className="btn btn-outline-primary">Soumettre une demande d'inscription</a></h5></Col>
                  <Col xs="1"/>
                </Row>
                <hr/>

                <Row>
                  <Col xs="1"/>
                  <Col><h5 className="text-center">Vous disposez déjà d'un compte?<br/>
                  <br/><a href="#/login" role="button" class="btn btn-outline-dark">Se connecter</a></h5></Col>
                  <Col xs="1"/>
                </Row>

              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}

export default Home;
