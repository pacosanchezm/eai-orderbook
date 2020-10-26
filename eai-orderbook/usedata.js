import axios from "axios"
//import moment from "moment"

// ------------------------------------------------------------------

let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
// let graphqlserver = "https://smxai.net/graphqleai2"


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
                        Fecha
                        Cuenta
                        Sucursal
                        SucursalDesc
                        Cliente
                        Nombre
                        Apellido
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

          if (axdataRes) {return axdataRes} else {return 0}
        },



      }
    }, // --- Pedidos



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


        del: async function(ConsumoId) {
    
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
                  "Id": ConsumoId,
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Delete
    
          if (axdataRes) {
            this.Consumos().get();
          }
        }.bind(this),







      };
    }, // ------- Consumos











  }
}

export default usedata

