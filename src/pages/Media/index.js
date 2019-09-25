import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdTimeline } from 'react-icons/md';
import { Container, List, TableHeader, TableTitle, Menu, Top } from './styles';
import api from '../../services/api';

export default class Media extends Component {
  state = {
    estimativaSelic: [],
    listAnoMedia: [],
  };

  async componentDidMount() {
    const response = await api.get('/estimativaSelic/');
    this.setState({ estimativaSelic: response.data });
    const { estimativaSelic } = this.state;
    let ano = 0;
    let soma = 0;
    let qtdMeses = 0;
    const listAnoMediaTemp = [];
    for (let index = 0; index < estimativaSelic.length; index++) {
      const item = estimativaSelic[index];
      if (!ano) {
        ano = item.ano;
      }
      if (ano !== item.ano) {
        listAnoMediaTemp.push({
          anoSelic: ano,
          mediaSelic: (soma / qtdMeses).toFixed(2),
        });
        ano = item.ano;
        soma = item.estimativa_taxa_selic;
        qtdMeses = 1;
      } else {
        soma += item.estimativa_taxa_selic;
        qtdMeses += 1;
      }
      if (!estimativaSelic[index + 1]) {
        listAnoMediaTemp.push({
          anoSelic: ano,
          mediaSelic: (soma / qtdMeses).toFixed(2),
        });
      }
    }
    this.setState({ listAnoMedia: listAnoMediaTemp });
  }

  render() {
    const { listAnoMedia } = this.state;
    return (
      <Container>
        <Top>
          <h1>
            <MdTimeline />
            Estimativa Selic
          </h1>
          <Menu>
            <Link to="/">Estimativa Selic</Link>
          </Menu>
        </Top>
        <TableHeader>
          <div>Ano</div>
          <TableTitle>Média por Ano</TableTitle>
          <div>Média</div>
        </TableHeader>
        <List>
          {listAnoMedia.map(am => (
            <li key={String(am.anoSelic)}>
              <div>{am.anoSelic}</div>
              <div>{am.mediaSelic}</div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
