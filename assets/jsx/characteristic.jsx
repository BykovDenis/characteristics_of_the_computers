import React from 'react';

const Characteristic = React.createClass({
  getInitialState: function(){

    const xhr = new XMLHttpRequest();
    const models = '';

    xhr.onload = function(){
      const models = JSON.parse(xhr.responseText).computer;
      this.setState({models: models, model: models[0].main.model, computer: models[0]});
    }.bind(this);

    xhr.open('GET','server/models.json', true);
    xhr.send(null);

    return {models: models};
  },

  modelSelected: function(e){
    const models = this.state.models;
    const model = e.target.value;

    const computer = models.filter(function(elem){
      return elem.main.model === model;
    });

    this.setState({models: models, model: model, computer: computer[0]});
  },

  render: function(){
    const models = this.state.models;
    const model = this.state.model;
    const computer = this.state.computer;
    var select = [];

    for(var elem in models){
      select.push(<option>{models[elem].main.model}</option>);
    }

    var cols = [];

    for(var elem in computer){

        if(elem === 'main'){

          cols.push(<tr className="table table-striped table-hover table-bordered">
                  <th colspan = "2">
                    Основные характеристики
                  </th>
                </tr>);

          cols.push(<tr className="table table-striped table-hover table-bordered">
                      <td>
                        Производители
                      </td>
                      <td>
                        {computer[elem].producer}
                      </td>
                    </tr>);
          cols.push(<tr className="table table-striped table-hover table-bordered">
                      <td>
                        Модель компьютера
                      </td>
                      <td>
                        {computer[elem].model}
                      </td>
                    </tr>);
          cols.push(<tr className="table table-striped table-hover table-bordered">
                      <td>
                        Операционная система
                      </td>
                      <td>
                        {computer[elem].OS}
                      </td>
                    </tr>);
          }

          if(elem === 'display'){

            cols.push(<tr className="table table-striped table-hover table-bordered">
                    <th colspan = "2">
                      Дисплей
                    </th>
                  </tr>);

            cols.push(<tr className="table table-striped table-hover table-bordered">
                        <td>
                          Диагональ
                        </td>
                        <td>
                          {computer[elem].diagonal}
                        </td>
                      </tr>);
            cols.push(<tr className="table table-striped table-hover table-bordered">
                        <td>
                          Разрешение экрана
                        </td>
                        <td>
                          {computer[elem].resolution}
                        </td>
                      </tr>);
            }
            if(elem === 'processor'){

              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <th colspan = "2">
                            Процессор
                          </th>
                        </tr>);

              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <td>
                            Производство
                          </td>
                          <td>
                            {computer[elem].producer}
                          </td>
                        </tr>);
              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <td>
                            Линейка
                          </td>
                          <td>
                            {computer[elem].line}
                          </td>
                        </tr>);
              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <td>
                            Модель
                          </td>
                          <td>
                            {computer[elem].model}
                          </td>
                        </tr>);
              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <td>
                            Тактовая частота
                          </td>
                          <td>
                            {computer[elem].rate}
                          </td>
                        </tr>);
              cols.push(<tr className="table table-striped table-hover table-bordered">
                          <td>
                            Количество ядер
                          </td>
                          <td>
                            {computer[elem].core}
                          </td>
                        </tr>);
              }
    }

    var table = [];
    table.push(<table className="table table-striped table-hover table-bordered">
      {cols}
    </table>);

    return (<form method="get" className="form-group">
              <h1>Характеристика компьютера</h1>
              <label for="selComp">Выберите модель компьютера</label>
              <select onChange={this.modelSelected} id="selComp" className="form-control">
                {select.map((elem)=>{
                  return elem;
                })}
              </select>
              <div>
                {table}
              </div>
            </form>);
  }

});

export default Characteristic;
