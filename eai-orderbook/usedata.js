import axios from "axios"
//import moment from "moment"

// ------------------------------------------------------------------

  // let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
  let graphqlserver = "https://smxai.net/graphqleai2"


let usedata = function(StateContextM) {

  return {

    Productos: function() {

      return {
        get: async function(e) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Menu($Query: MenuInput) {
                  Menus {
                    Consultas {
                      Amplia1(Query: $Query) {
                        Id
                        Sucursal
                        CategoriasTitulo
                        CategoriasDescripcion
                        Producto
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosIcon
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        Precio
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Sucursal: e.Sucursal
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Menus.Consultas.Amplia1;
    
          if (axdataRes) { return axdataRes } else {return 0}
        },
     

        getDetalle: async function(e) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Menu($Query: MenuInput) {
                  Menus {
                    Consultas {
                      Amplia1(Query: $Query) {
                        Id
                        Precio
                        PrecioObv
                        Precio2
                        PrecioObv2
                        Precio3
                        PrecioObv3                      
                        Producto
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosIcon
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        ProductosVideo
                        ProductosObv
                        CategoriasTitulo
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Number(e.Id)
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Menus.Consultas.Amplia1[0];
    
          if (axdataRes) { return axdataRes } else {return 0}
    
            // let MiDetalle = {...axdataRes,
            // "ProductosId": axdataRes.Producto,
            // "ConsumosPrecio": axdataRes.Precio,
            // "ConsumosPrecioObv": axdataRes.PrecioObv,
            // "ConsumosDescuento": [""],
            // "ConsumosCantidad": 1,
            // "ConsumosImporte": axdataRes.Precio,
            // "ConsumosObv": "",
            // "CategoriasTitulo": axdataRes.CategoriasTitulo,
            // }
    
            // setDetalle(MiDetalle);
            // this.Extras().get(axdataRes.Producto)
            // setLoadingDet(false)


          
        },

      };
    }, // ------- Productos












    Pedidos: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query PedidoResumenSuma($Query: PedidoInput){
                  Pedidos{
                    Consultas{
                      PedidoResumenSuma(Query: $Query ){
                        Id
                        Codigo
                        Fecha
                        Cuenta
                        Sucursal
                        SucursalDesc
                        Cliente
                        Nombre
                        Apellido
                        Telefono
                        Status
                        Monto
                        Pagado
                        TipoEntrega
                        Confirmado
                        Atendido
                        Enviado
                        Entregado
                        Proceso
                        ProcesoObv
                        Obv
                        ConsumosMonto
                        ConsumosCuenta
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumenSuma
          console.log({axdataRes})

          if (axdataRes) {return axdataRes} else {return 0}
        },



        getDetalle: async function(MenuId) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Menu($Query: MenuInput) {
                  Menus {
                    Consultas {
                      Amplia1(Query: $Query) {
                        Id
                        Precio
                        PrecioObv
                        Precio2
                        PrecioObv2
                        Precio3
                        PrecioObv3                      
                        Producto
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosIcon
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        ProductosVideo
                        ProductosObv
                      

                        CategoriasTitulo
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: MenuId
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Menus.Consultas.Amplia1[0];
    
          if (axdataRes) { return axdataRes} else {return 0}
        },

        up : async function(e) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upPedido ($Query: PedidoInput ) {
                  PedidosM {
                    Registro {
                      UpdatePedido (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                  Cliente: e.Cliente,
                  Cuenta: e.Cuenta,
                  TipoEntrega: e.TipoEntrega,
                  Monto: Number(e.Monto),
                  Obv: e.Obv
                }
              }
            }
          });
    
          if (axdata.data.data) { return 1
            // console.log("Guardado");
            // await this.Clientes().up();
            // setEditado(false);
            // this.Pedidos().getLista();
          } else {return 0}
          
        },

        add : async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation AddPedido ($Query: PedidoInput ) {
                  PedidosM {
                    Registro {
                      InsertPedido (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Sucursal: e.Sucursal,
                  Cliente: e.Cliente ? e.Cliente : null,
                  Referido: e.Referido ? e.Referido : null,
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Registro.InsertPedido;
          if (axdataRes) { return axdataRes} else {return 0}
          
        },





        sendSms: async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation sendsms ($Query: PedidoInput ) {
                  PedidosM {
                    Envios {
                      Sms (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: e.Telefono,
                  Nombre: e.Nombre,
                  Codigo: e.Codigo,
                  Sucursal: e.Sucursal
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Envios.Sms;
          console.log(axdataRes);
          if (axdataRes) {
            console.log("Mandado:" + axdataRes);
            return 1;
          } else {
            return 0;
          }
        },



        sendSms2: async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation sendsms ($Query: PedidoInput ) {
                  PedidosM {
                    Envios {
                      Sms2 (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: e.Telefono,
                  Nombre: e.Nombre,
                  Codigo: e.Codigo,
                  Sucursal: e.Sucursal
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Envios.Sms2;
          console.log(axdataRes);
          if (axdataRes) {
            console.log("Mandado:" + axdataRes);
            return 1;
          } else {
            return 0;
          }
        },














      }
    }, // --- Pedidos



    Extras: function() {

      return {

        get : async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Extras ($Query: ExtraInput) {
                  Extras {
                    Consultas {
                      Amplia1 (Query: $Query) {
                        Producto
                        Id
                        Titulo
                        Descripcion
                        ExtrasDetId
                        ExtrasDetTitulo
                        ExtrasDetPrecio
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Producto: Number(e.Id)
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Extras.Consultas.Amplia1;
      
          if (axdataRes) {
            let MiExtras = axdataRes.map(row => {
              return (
                {...row,
                  "ExtrasDetCantidad": 0,
                  "ExtrasDetImporte": 0,
                }
              )
            })
      
            return MiExtras
            
          } else {return 0}
        },


      };
    }, // ------- Extras








    Consumos: function() {

      return {

        get2: async function(MiPedido) {
          try {
           // setLoading(true)
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: MiPedido }
                }
              }
            });
            let axdataRes = axdata.data.data.Consumos.Consultas.Resumen1
            if (axdataRes) { return axdataRes } else return 0
          } catch (e) {console.error(e)}
        }, // ----get


        add: async function(e) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Insert (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Pedido": e.Pedido,
                  "Producto": e.Producto,
                  "Precio": e.Precio,
                  "PrecioObv": e.PrecioObv,
                  "Descuento": 0,
                  "Cantidad": e.Cantidad,
                  "Importe": e.Importe,
                  Obv: e.Obv
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Insert
          if (axdataRes) { return axdataRes } else return 0
        },




        



















        up: async function(props) {    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation UpdateConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Update (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Id": Detalle.ConsumosId,
                  "Precio": Detalle.ConsumosPrecio,
                  "Descuento": 0,
                  "Cantidad": Detalle.ConsumosCantidad,
                  "Importe": Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + this.Extras().sum),
                  Obv: Detalle.ConsumosObv
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Update
          if (axdataRes) {
            this.Consumos().getPart()

            ExtrasDet.map((row, i) => {
              if(row.Id===ConsumosExtras[i].Id) {
                if(row.ExtrasDetCantidad!==ConsumosExtras[i].ExtrasDetCantidad) {
                 this.ConsumosExtras().up(row.Id, row.ExtrasDetCantidad)
                }
              }
              return 1
            })
          }
          return 1
        }.bind(this),


        del: async function(e) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation DeleteConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Delete (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Id": e.Id,
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Delete
    
          if (axdataRes) { return 1 } else {return 0}
        },







      };
    }, // ------- Consumos



    Clientes: function() {

      return {
        pull: async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation PullCliente ($Query: ClienteInput ) {
                  PedidosM {
                    Pull {
                      Cliente (Query: $Query)  {
                        Id
                        Nombre
                        ApellidoPat
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: e.Telefono
                }
              }
            }
          });

          let axdataRes = axdata.data.data.PedidosM.Pull.Cliente
          if (axdataRes) { return axdataRes } else {return 0}

        },


        up: async function(e) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upCliente ($Query: ClienteBono ) {
                  PedidosM {
                    Registro {
                      UpdateCliente (Query: $Query) 
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: e.Cliente,
                  Telefono: e.Telefono,
                  Nombre: e.Nombre,
                  ApellidoPat: e.Apellido
                }
              }
            }
          });

          let axdataRes = axdata.data.data.PedidosM.Registro.UpdateCliente
          if (axdataRes) { return axdataRes } else {return 0}

        },


      };
    }, // ------- Clientes




  }
}

export default usedata

