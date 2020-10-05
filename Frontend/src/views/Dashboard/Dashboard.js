import React, { Component} from 'react';
import { Bar, Line, Doughnut} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  FormGroup, InputGroup,InputGroupAddon,Input,
  Pagination, PaginationItem, PaginationLink, Table,
  ButtonGroup,
  Collapse, Button,
} from 'reactstrap';
import axios from "axios";

const cardChartData3 = {
  labels: ['1','2','3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    {
      backgroundColor: 'rgba(255,255,255,.4)',
      borderColor: 'rgba(255,255,255,.8)',
      data: [15, 34, 30, 40, 50, 34, 40, 65, 80],
      barPercentage: 0.6,
    },
  ],
};
const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData3.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData3.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};
const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 4,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};
const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};
const doughnutOpts = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_LINK:'https://costats.ew.r.appspot.com/',

      acc12:true,
      accordion12: [true, false],
      displayStyle12:["display:block;","display:none;"],
      colors1:["warning","light"],
      colors2:["danger","light"],

      acc3:true,
      accordion3: [true, false,false],
      displayStyle3:["display:block;","display:none;","display:none;"],
      colors3:["primary","light","light"],

      acc4:true,
      accordion4: [true, false],
      displayStyle4:["display:block;","display:none;"],
      colors4:["dark","light"],

      acc567:true,

      Cooperatives:[],
      Pertes:[],
      Revenus:[],
      Membres:[],

      Communications:[],
      Ventes:[],
      Formations:[],
      Evenements:[],

      Secteurs:[],
      Regions:[],
      CanalComm:[],

      searchCoop:'',
      searchSecteur:'',
      searchRegion:'',
    };
  }

  componentDidMount() {
    let user=JSON.parse(localStorage.getItem("user"));
    if(user===null){
      this.props.history.push("/login");
    }
    else if(user.role==="user"){
      this.props.history.push("/account");
    }
    else{
      axios.get(this.state.API_LINK+'secteur/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'region/all')
                .then((response) =>{
                  axios.get(this.state.API_LINK+'cooperative/all')
                      .then((response) =>{
                        this.setState({
                          Cooperatives: response.data,
                        })
                      });
                  this.setState({
                    Regions: response.data,
                  })
                });
            this.setState({
              Secteurs: response.data,
            })
          });
      axios.get(this.state.API_LINK+'perte/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'revenu/all')
                .then((response) =>{
                  axios.get(this.state.API_LINK+'membre/all')
                      .then((response) =>{
                        this.setState({
                          Membres: response.data,
                        })
                      });
                  this.setState({
                    Revenus: response.data,
                  })
                });
            this.setState({
              Pertes: response.data,
            })
          });


      axios.get(this.state.API_LINK+'communication/all')
          .then((response) =>{
            axios.get(this.state.API_LINK+'produit/all')
              .then((response) =>{
                axios.get(this.state.API_LINK+'formation/all')
                    .then((response) =>{
                      axios.get(this.state.API_LINK+'evenement/all')
                          .then((response) =>{
                            this.setState({
                              Evenements: response.data,
                            })
                          });
                      this.setState({
                        Formations: response.data,
                      })
                    });
                this.setState({
                  Ventes: response.data,
                })
              });
            this.setState({
              Communications: response.data,
            })
          });

    }
  }

  toggleAccordion12() {
    this.setState({
      acc12:!this.state.acc12,
      acc3:!this.state.acc3,
    })
  }
  toggleSubAccordionMain12(tab) {
    let prevState = this.state.accordion12;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    let prevDisp=["display:none;","display:none;"];
    let prevColor1=["light","light"];
    let prevColor2=["light","light"];
    prevDisp[tab]="display:block;";
    prevColor1[tab]=["warning"];
    prevColor2[tab]=["danger"];

    this.setState({
      accordion12: state,
      displayStyle12:prevDisp,
      colors1:prevColor1,
      colors2:prevColor2,
    });
  }
  toggleSubAccordion12(tab) {
    this.toggleSubAccordion3(tab);
    let prevState = this.state.accordion12;
    if (prevState[tab] === true){
      this.setState({
        acc12: !this.state.acc12,
        acc3:!this.state.acc3,
      });
    }
  }
  toggleAccordion3() {
    this.setState({
      acc12:!this.state.acc12,
      acc3:!this.state.acc3,
    })
  }
  toggleSubAccordion3(tab) {
    if(tab<2 && this.state.accordion12[tab]===false)
    {
      this.toggleSubAccordionMain12(tab);
    }
    let prevState = this.state.accordion3;
    if (prevState[tab] === false){
      const state = prevState.map((x, index) => tab === index ? !x : false);
      let prevDisp=["display:none;","display:none;","display:none;"];
      let prevColor3=["light","light","light"];

      prevColor3[tab]=["primary"];
      prevDisp[tab]="display:block;";

      this.setState({
        accordion3: state,
        displayStyle3:prevDisp,
        colors3:prevColor3,
      });
    }
    else
    {
      this.setState({
        acc3: !this.state.acc3,
        acc12:!this.state.acc12,
      });
    }
  }
  toggleAccordion4() {
    this.setState({
      acc4:!this.state.acc4,
      acc567:!this.state.acc567,
    })
  }
  toggleSubAccordion4(tab) {
    let prevState = this.state.accordion4;
    if (prevState[tab] === false){
      const state = prevState.map((x, index) => tab === index ? !x : false);
      let prevDisp=["display:none;","display:none;"];
      let prevColor4=["light","light"];

      prevColor4[tab]=["dark"];
      prevDisp[tab]="display:block;";

      this.setState({
        accordion4: state,
        displayStyle4:prevDisp,
        colors4:prevColor4,
      });
    }
    else
    {
      this.setState({
        acc567:!this.state.acc567,
        acc4: !this.state.acc4,
      });
    }
  }
  toggleAccordion567() {
    this.setState({
      acc567:!this.state.acc567,
      acc4:!this.state.acc4,
    })
  }

  NumberCoopParSecteur(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      if(element.idSecteur===id)
      {
        ret++;
      }
    })
    return ret;
  }
  CoopParSecteur(){
    return(
        <ul>
          {this.state.Secteurs.map((element, index)=>
          {return(
              <div className="progress-group ml-n5">
                <div className="progress-group-header">
                  <span className="title">{element.nomSecteur}</span>
                  <span className="ml-auto font-weight-bold">{this.NumberCoopParSecteur(index)}<span className="text-muted small">
                    ({Math.floor(100*this.NumberCoopParSecteur(index)/this.state.Cooperatives.length)}%)</span></span>
                </div>
                <div className="progress-group-bars">
                  <Progress className="progress-xs" color="warning" value={100*this.NumberCoopParSecteur(index)/this.state.Cooperatives.length} />
                  <Progress className="progress-xs" color="white" value="100" />
                </div>
              </div>)}
          )}
        </ul>
    )
  }
  NumberCoopParRegion(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      if(element.idRegion===id)
      {
        ret++;
      }
    })
    return ret;
  }
  CoopParRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.nomRegion}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberCoopParRegion(index)}<span className="text-muted small">
                    ({Math.floor(100*this.NumberCoopParRegion(index)/this.state.Cooperatives.length)}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value={100*this.NumberCoopParRegion(index)/this.state.Cooperatives.length} />
                      <Progress className="progress-xs" color="white" value="100" />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  NumberProfit(type,index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSecteur;
      else idType=element.idRegion;
      if(idType===id){
        this.state.Revenus.forEach(revenu=>{
          if(revenu.idCooperative===element.id)
            ret+=revenu.sommeGagnee;
        })
      }
    })
    return ret;
  }
  SumProfit(){
    let ret=0;
    this.state.Revenus.forEach(element=>{
      ret+=element.sommeGagnee;
    })
    return ret;
  }
  ProfitParSecteur(){
    return(
      <ul>
        {this.state.Secteurs.map((element, index)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.nomSecteur}</span>
                <span className="ml-auto font-weight-bold">{this.NumberProfit(0,index)}<span className="text-muted small">
              ({Math.floor(100*this.NumberProfit(0,index)/this.SumProfit())}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="danger" value={100*this.NumberProfit(0,index)/this.SumProfit()} />
                <Progress className="progress-xs" color="white" value="100" />
              </div>
            </div>)}
        )}
      </ul>
    )
  }
  ProfitParRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.nomRegion}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberProfit(1,index)}<span className="text-muted small">
              ({Math.floor(100*this.NumberProfit(1,index)/this.SumProfit())}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="danger" value={100*this.NumberProfit(1,index)/this.SumProfit()} />
                      <Progress className="progress-xs" color="white" value="100" />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  NumberAdherenetParSexe(type,index){
    let ret=[0,0];
    let sum=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSecteur;
      else idType=element.idRegion;

      if(idType===id){
        this.state.Membres.forEach(member=>{
          if(member.idCooperative===element.id) {
            if (member.sexe === "Homme") {
              ret[0]++
            }
            sum++;
          }
        })
      }
    })
    ret[1]=sum-ret[0];
    return ret;
  }
  NumberAdherenet(type,index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Cooperatives.forEach(element=>{
      let idType;
      if(type===0) idType=element.idSecteur;
      else idType=element.idRegion;
      if(idType===id){
        this.state.Membres.forEach(member=>{
          if(member.idCooperative===element.id)
            ret++;
        })
      }
    })
    return ret;
  }
  AdherentParSecteur(){
    return(
        <ul>
          {this.state.Secteurs.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.nomSecteur}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberAdherenet(0,index)}<span className="text-muted small">
                      ({Math.floor(100*this.NumberAdherenet(0,index)/this.state.Membres.length)}%)
                      [{this.NumberAdherenetParSexe(0,index)[0]}|{this.NumberAdherenetParSexe(0,index)[1]}]</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="info" value={100*this.NumberAdherenetParSexe(0,index)[0]/this.state.Membres.length} />
                      <Progress className="progress-xs" color="danger" value={100*this.NumberAdherenetParSexe(0,index)[1]/this.state.Membres.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }
  AdherentParRegion(){
    return(
        <ul>
          {this.state.Regions.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.nomRegion}</span>
                      <span className="ml-auto font-weight-bold">{this.NumberAdherenet(1,index)}<span className="text-muted small">
                      ({Math.floor(100*this.NumberAdherenet(1,index)/this.state.Membres.length)}%)
                      [{this.NumberAdherenetParSexe(1,index)[0]}|{this.NumberAdherenetParSexe(1,index)[1]}]
                      </span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="info" value={100*this.NumberAdherenetParSexe(1,index)[0]/this.state.Membres.length} />
                      <Progress className="progress-xs" color="danger" value={100*this.NumberAdherenetParSexe(1,index)[1]/this.state.Membres.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }
  NumberAdherentSexe(){
    let ret=[0,0];
    this.state.Membres.forEach(element=>{
      if(element.sexe==="Homme"){ret[0]++}
    })
    ret[1]=this.state.Membres.length-ret[0];
    return ret;
  }
  doughnutSexe(){
    return({
      labels: [
        'Hommes',
        'Femmes',
      ],
      datasets: [
        {
          data: [this.NumberAdherentSexe()[0], this.NumberAdherentSexe()[1]],
          backgroundColor: [
            '#F86C6B',
            '#20A8D8',
          ],
          hoverBackgroundColor: [
            '#F86C6B',
            '#20A8D8',
          ],
        }],
    })
  };
  AdherentParSexe(){
    return(
        <div>
          <Row>
            <Col xs="6"><Card className="text-center pt-2 mx-n2 btn-outline-primary"><h6>Hommes: {Math.floor(100*this.NumberAdherentSexe()[0]/this.state.Membres.length)}%</h6></Card></Col>
            <Col xs="6"><Card className="text-center pt-2 mx-n2 btn-outline-danger"><h6>Femmes: {Math.floor(100*this.NumberAdherentSexe()[1]/this.state.Membres.length)}%</h6></Card></Col>

              <Doughnut data={this.doughnutSexe()} options={doughnutOpts} height={100}/>
          </Row>
        </div>
    )
  }

  CoopVente(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Ventes.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret+=element.qteProduit;
      }
    })
    return ret;
  }
  SumVente(){
    let ret=0;
    this.state.Ventes.forEach(element=>{
      ret+=element.qteProduit;
    })
    return ret;
  }
  Vente(){
    return(
      <ul>
        {this.state.Cooperatives.map((element, index)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.nomCooperative}</span>
                <span className="ml-auto font-weight-bold">{this.CoopVente(index)}<span className="text-muted small">
              ({Math.floor(100*this.CoopVente(index)/this.SumVente())}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="dark" value={100*this.CoopVente(index)/this.SumVente()} />
              </div>
            </div>)}
        )}
      </ul>
    )
  }

  CoopComm(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Communications.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret++;
      }
    })
    return ret;
  }
  Communication(){
    return(
      <ul>
        {this.state.Cooperatives.map((element, index)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.nomCooperative}</span>
                <span className="ml-auto font-weight-bold">{this.CoopComm(index)}<span className="text-muted small">
                  ({Math.floor(100*this.CoopComm(index)/this.state.Communications.length)}%)</span></span>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="dark" value={100*this.CoopComm(index)/this.state.Communications.length} />
              </div>
            </div>)}
        )}
      </ul>
    )
  }

  NumberCanal(){
    let ret=[0,0,0,0];
    this.state.Communications.forEach(comm=>{
      ret[comm.idCanalComm-1]=comm.nombreUtilisationAnnuel;
    })

    return ret;
  }
  doughnutCanal(){
    return({
      labels: [
        'Réseaux sociaux',
        'Publicité TV',
        'Panneau publicitaire',
        'Autre...',
      ],
      datasets: [
        {
          data: this.NumberCanal(),
          backgroundColor: [
            '#F86C6B',
            '#F0A8D8',
            '#20F828',
            '#20A8D8',
          ],
          hoverBackgroundColor: [
            '#F86C6B',
            '#F0A8D8',
            '#20F828',
            '#20A8D8',
          ],
        }],
    })
  };
  Canal(){
    return(
        <Doughnut data={this.doughnutCanal()} options={doughnutOpts} height={120}/>
    )
  }

  CoopFormation(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Formations.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret++;
      }
    })
    return ret;
  }
  Formation(){
    return(
      <ul>
        {this.state.Cooperatives.map((element, index)=>
          {return(
            <div className="progress-group ml-n5">
              <div className="progress-group-header">
                <span className="title">{element.nomCooperative}</span>
                <span className="ml-auto font-weight-bold">{this.CoopFormation(index)}<span className="text-muted small">
          ({Math.floor(100*this.CoopFormation(index)/this.state.Formations.length)}%)</span></span>
            </div>
            <div className="progress-group-bars">
              <Progress className="progress-xs" color="dark" value={100*this.CoopFormation(index)/this.state.Formations.length} />
            </div>
          </div>)}
        )}
      </ul>
    )
  }

  CoopEvenement(index){
    let ret=0;
    let id=parseInt(index)+1;
    this.state.Evenements.forEach(element=>{
      if(element.idCooperative===id)
      {
        ret++;
      }
    })
    return ret;
  }
  Evenement(){
    return(
        <ul>
          {this.state.Cooperatives.map((element, index)=>
              {return(
                  <div className="progress-group ml-n5">
                    <div className="progress-group-header">
                      <span className="title">{element.nomCooperative}</span>
                      <span className="ml-auto font-weight-bold">{this.CoopEvenement(index)}<span className="text-muted small">
          ({Math.floor(100*this.CoopEvenement(index)/this.state.Evenements.length)}%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="dark" value={100*this.CoopEvenement(index)/this.state.Evenements.length} />
                    </div>
                  </div>)}
          )}
        </ul>
    )
  }

  showCoops(){
    return(
        <tbody>
        {/* eslint-disable-next-line array-callback-return */}
        {this.state.Cooperatives.map((element, index)=>
            {
              const Coop=element.nomCooperative;
              const Sect=(this.state.Secteurs[element.idSecteur-1]).nomSecteur;
              const Reg=(this.state.Regions[element.idRegion-1]).nomRegion
              if(Coop.includes(this.state.searchCoop) && Sect.includes(this.state.searchSecteur) && Reg.includes(this.state.searchRegion))
              return(
                <tr>
                  <td>{Coop}</td>
                  <td>{Sect}</td>
                  <td>{Reg}</td>
                </tr>)}
        )}
    </tbody>
    )
  }
  CoopsTable() {
    return(
      <div className="text-center">
        <Table responsive striped>
          <thead>
          <tr>
            <th>Coopérative</th>
            <th>Secteur</th>
            <th>Région</th>
          </tr>
          <tr>
            <th><Input type="text" className="text-center" placeholder="Chercher par Coopérative..." onChange={(e) => {
              this.setState({searchCoop : e.target.value})}}/></th>
            <th><Input type="text" className="text-center" placeholder="Chercher par Secteur..." onChange={(e) => {
              this.setState({searchSecteur : e.target.value})}}/></th>
            <th><Input type="text" className="text-center" placeholder="Chercher par Région..." onChange={(e) => {
              this.setState({searchRegion : e.target.value})}}/></th>
          </tr>
          </thead>
          {this.showCoops()}
        </Table>
      </div>
    )
  }

  render() {
    return (
      <div className="mx-4">
        <Row>
          <Col xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion12()} className="text-white bg-warning hoverPointer border-warning">
                <Row>
                  <Col><h2 >Coopérative</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className=" icon-people"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3" ><strong>{this.state.Cooperatives.length}</strong></h1>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '100px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc12}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion12(0)}
                          className="btn-square" color={this.state.colors1[0]}>Par Secteur</Button>
                  <Button onClick={() => this.toggleSubAccordion12(1)}
                          className="btn-square" color={this.state.colors1[1]}>Par Région</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle12[0]}>
                    <Collapse isOpen={this.state.accordion12[0]}>
                      <CardBody>
                        {this.CoopParSecteur()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle12[1]}>
                    <Collapse isOpen={this.state.accordion12[1]}>
                      <CardBody>
                        {this.CoopParRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion12()} className="text-white bg-danger hoverPointer border-danger">
                <Row>
                  <Col><h2>Profit</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className="icon-graph"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3" ><strong>{this.SumProfit()}</strong></h1>
                <div className="mt-n5 mb-n3 mx-n3" style={{ height: '108px' }}>
                  <Line data={cardChartData3} options={cardChartOpts1} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc12}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion12(0)}
                          className="btn-square" color={this.state.colors2[0]}>Par Secteur</Button>
                  <Button onClick={() => this.toggleSubAccordion12(1)}
                          className="btn-square" color={this.state.colors2[1]}>Par Région</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle12[0]}>
                    <Collapse isOpen={this.state.accordion12[0]}>
                      <CardBody>
                        {this.ProfitParSecteur()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle12[1]}>
                    <Collapse isOpen={this.state.accordion12[1]}>
                      <CardBody>
                        {this.ProfitParRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>
          
          <Col  xs="4">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion3()} className="text-white bg-primary hoverPointer border-primary">
                <Row>
                  <Col><h2>Adhérent</h2></Col>
                  <Col><h1 className="mx-2 text-right"><i className="icon-user"/></h1></Col>
                </Row>
                <h1 className="mt-n3 mb-3"><strong>{this.state.Membres.length}</strong></h1>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '100px' }}>
                  <Bar data={cardChartData3} options={cardChartOpts4} />
                </div>
              </CardHeader>

              <Collapse isOpen={this.state.acc3}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion3(0)}
                          className="btn-square" color={this.state.colors3[0]}>Par Secteur</Button>
                  <Button onClick={() => this.toggleSubAccordion3(1)}
                          className="btn-square" color={this.state.colors3[1]}>Par Région</Button>
                  <Button onClick={() => this.toggleSubAccordion3(2)}
                          className="btn-square" color={this.state.colors3[2]}>Par Sexe</Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle3[0]}>
                    <Collapse isOpen={this.state.accordion3[0]}>
                      <CardBody>
                        {this.AdherentParSecteur()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle3[1]}>
                    <Collapse isOpen={this.state.accordion3[1]}>
                      <CardBody>
                        {this.AdherentParRegion()}
                      </CardBody>
                    </Collapse>
                  </Col>

                  <Col Style={this.state.displayStyle3[2]}>
                    <Collapse isOpen={this.state.accordion3[2]}>
                      <CardBody>
                        {this.AdherentParSexe()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="3">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion4()} className="text-white bg-gray-700 hoverPointer border-dark">
                <Row>
                  <Col><h4 className="ml-n2">Communication</h4></Col>
                  <Col><h3 className="mr-n3 text-right"><i className=" icon-people"/></h3></Col>
                </Row>
                <h3 className="mb-3" ><strong>{this.state.Communications.length}</strong></h3>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc4}>
                <ButtonGroup className="m-0 app-body">
                  <Button onClick={() => this.toggleSubAccordion4(0)}
                          className="btn-square" color={this.state.colors4[0]}>Par coopératives</Button>
                  <Button onClick={() => this.toggleSubAccordion4(1)}
                          className="btn-square" color={this.state.colors4[1]}>Par Canals </Button>
                </ButtonGroup>
                <Row>
                  <Col Style={this.state.displayStyle4[0]}>
                    <Collapse isOpen={this.state.accordion4[0]}>
                      <CardBody>
                        {this.Communication()}
                      </CardBody>
                    </Collapse>
                  </Col>
                  <Col Style={this.state.displayStyle4[1]}>
                    <Collapse isOpen={this.state.accordion4[1]}>
                      <CardBody>
                        {this.Canal()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="3">
            <Card>
              <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
                <Row>
                  <Col><h4 >Ventes</h4></Col>
                  <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
                </Row>
                <h3 className="mb-3" ><strong>{this.SumVente()}</strong></h3>
                <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                  <Line data={cardChartData3} options={cardChartOpts3} />
                </div>
              </CardHeader>
              <Collapse isOpen={this.state.acc567}>
                <ButtonGroup className="m-0 app-body">
                  <Button className="btn-square" color="dark">Par coopératives</Button>
                </ButtonGroup>
                <Row>
                  <Col>
                    <Collapse isOpen={true}>
                      <CardBody>
                        {this.Vente()}
                      </CardBody>
                    </Collapse>
                  </Col>
                </Row>
              </Collapse>
            </Card>
          </Col>

          <Col xs="3">
          <Card>
            <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
              <Row>
                <Col><h4 >Formations</h4></Col>
                <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
              </Row>
              <h3 className="mb-3" ><strong>{this.state.Formations.length}</strong></h3>
              <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} />
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.acc567}>
              <ButtonGroup className="m-0 app-body">
                <Button className="btn-square" color="dark">Par coopératives</Button>
              </ButtonGroup>
              <Row>
                <Col>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {this.Formation()}
                    </CardBody>
                  </Collapse>
                </Col>
              </Row>
            </Collapse>
          </Card>
        </Col>

          <Col xs="3">
          <Card>
            <CardHeader onClick={() => this.toggleAccordion567()} className="text-white bg-gray-700 hoverPointer border-dark">
              <Row>
                <Col><h4 >Evénements</h4></Col>
                <Col><h3 className="mx-2 text-right"><i className=" icon-people"/></h3></Col>
              </Row>
              <h3 className="mb-3" ><strong>{this.state.Evenements.length}</strong></h3>
              <div className="mt-n5 mb-n2 mx-n3" style={{ height: '50px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} />
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.acc567}>
              <ButtonGroup className="m-0 app-body">
                <Button className="btn-square" color="dark">Par coopératives</Button>
              </ButtonGroup>
              <Row>
                <Col>
                  <Collapse isOpen={true}>
                    <CardBody>
                      {this.Evenement()}
                    </CardBody>
                  </Collapse>
                </Col>
                </Row>
            </Collapse>
          </Card>
        </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-dark">
                <h1 className="display-4">Liste des Coopératives</h1>
              </CardHeader>
              {this.CoopsTable()}
          </Card>
          </Col>
        </Row>
        <hr/>
      </div>
    );
  }
}

export default Dashboard;
