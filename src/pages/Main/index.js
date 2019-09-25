import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Top from '../../components/Top';
import {
  MdTimeline,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import {
  Container,
  Form,
  SearchButton,
  List,
  TableHeader,
  TableTitle,
  Paginator,
  EmptyList,
  Top,
  Menu,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    ano: new Date().getFullYear(),
    mes: '',
    loading: false,
    estimativaSelic: [],
    meses: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  };

  async componentDidMount() {
    const { ano } = this.state;
    const response = await api.get(`/estimativaSelic/${ano}`);
    this.setState({ estimativaSelic: response.data });
  }

  handlerAnoChange = e => {
    // console.log('handlerAnoChange', this.state);
    this.setState({ ano: e.target.value });
  };

  handlerMesChange = e => {
    // console.log('handleMesChange', this.state);
    this.setState({ mes: e.target.value });
  };

  search = async e => {
    e.preventDefault();
    const { ano, mes } = this.state;
    this.setState({ estimativaSelic: [], loading: true });
    const response = await api.get(`/estimativaSelic/${ano}/${mes}`);
    if (mes) {
      this.setState({
        estimativaSelic: [response.data],
        loading: false,
      });
    } else {
      this.setState({
        estimativaSelic: response.data,
        loading: false,
      });
    }
  };

  handleSearchYear = async (e, ano) => {
    e.preventDefault();
    this.setState({ estimativaSelic: [], loading: true, ano: +ano });
    const response = await api.get(`/estimativaSelic/${ano}`);
    this.setState({
      estimativaSelic: response.data,
      loading: false,
    });
  };

  render() {
    const { ano, mes, meses, estimativaSelic, loading } = this.state;
    return (
      <Container>
        <Top>
          <h1>
            <MdTimeline />
            Estimativa Selic
          </h1>
          <Menu>
            <Link to="/media">Média</Link>
            <Link to="/acumulado">Acumulado</Link>
          </Menu>
        </Top>
        <Form onSubmit={this.search}>
          <input
            type="number"
            placeholder="Ano"
            value={ano}
            onChange={this.handlerAnoChange}
          />
          <input
            type="number"
            placeholder="Mês"
            value={mes}
            onChange={this.handlerMesChange}
          />
          <SearchButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <MdSearch color="#fff" size={14} />
            )}
          </SearchButton>
        </Form>
        {estimativaSelic.length ? (
          <>
            <TableHeader>
              <div>Mês</div>
              <TableTitle>{ano}</TableTitle>
              <div>Selic</div>
            </TableHeader>
            <List>
              {estimativaSelic.map(es => (
                <li key={String(es.id)}>
                  <div>{meses[es.mes - 1]}</div>
                  <div>{es.estimativa_taxa_selic}</div>
                </li>
              ))}
            </List>
          </>
        ) : (
          <EmptyList>Nenhum Resultado</EmptyList>
        )}
        <Paginator>
          <div
            onClick={e => this.handleSearchYear(e, +ano - 1)}
            role="presentation"
          >
            <MdKeyboardArrowLeft />
            {+ano - 1}
          </div>
          <div
            onClick={e => this.handleSearchYear(e, +ano + 1)}
            role="presentation"
          >
            {+ano + 1}
            <MdKeyboardArrowRight />
          </div>
        </Paginator>{' '}
      </Container>
    );
  }
}
