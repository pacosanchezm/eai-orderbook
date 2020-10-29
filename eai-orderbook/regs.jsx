import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [PedidoData, setPedidoData] = props.useContext.PedidoData
  const [Registros, setRegistros] = props.useContext.Registros
  const {useAcciones} = props
  const [OpenModal, setOpenModal] = props.useContext.Modal.Open

// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, getDetalleConsumo, i, usedata } = props;



  return (
    <div>

      <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

          <Flex sx={{ width: "100%", bg: Color }} columns={[1,null,2]}>

            <Button
              sx={{bg: "transparent"}}
              onClick={async () => {
              await useAcciones.addConsumo({
                Pedido: PedidoData.Id,
                Producto: Row.Producto,
                Precio: Row.Precio,
                Cantidad: 1,
                Importe: Row.Precio,
              })
              }}
            >

              <Flex sx={{ width: "34px", bg: Color, pr:0 }}>
                <Image sx={{ height: "34px", borderRadius: 3 }} src={Row.ProductosFoto} />
              </Flex>

            </Button>


            <Grid sx={{ width: "85%", bg: Color, gridGap: 0 }}>
              <Flex sx={{ width: "100%", bg: Color }}>
                <Box sx={{ width: "80%" }}>
                  <Text sx={Estilo.d1s}>{Row.ProductosTitulo} {"   "}
                  </Text>
                </Box>

                <Box sx={{ width: "10%", mr: 3 }}>
                  <Text sx={Estilo.d1s}>{Row.Precio}</Text>
                </Box>

                <Box sx={{ width: "13%" }}>
                  <Button
                    sx={{ width: "100%" }}
                    bg={"#4682B4"}
                    Disabled={false}
                    onClick={() => { useAcciones.getDetalle({Id: Row.Id}) }}
                  >
                    ...
                  </Button>
                </Box>

              </Flex>

            </Grid>

          </Flex>
      </Grid>

    </div>
  );
};


// ------------------------------

const Listado = props => {
  const Estilo = useThemeUI().theme.styles;
  const [FiltroProceso, setFiltroProceso] = props.useContext.Filtro.Proceso
    const [Search, setSearch] = props.useContext.Search

  const Renglones = Registros.filter(v => {

    let A = FiltroProceso.TOSTADAS.Activo ? v.CategoriasTitulo === "TOSTADAS" : null
    let B = FiltroProceso.ENTRADAS.Activo ? v.CategoriasTitulo === "ENTRADAS" : null
    let C = FiltroProceso.SOPAS.Activo ? v.CategoriasTitulo === "SOPAS" : null
    let D = FiltroProceso.ARROCES.Activo ? v.CategoriasTitulo === "ARROCES" : null
    let E = FiltroProceso.POKES.Activo ? v.CategoriasTitulo === "POKES" : null
    let F = FiltroProceso.NATURALES.Activo ? v.CategoriasTitulo === "NATURALES" : null
    let G = FiltroProceso.CALIENTES.Activo ? v.CategoriasTitulo === "CALIENTES" : null
    let H = FiltroProceso.HORNEADOS.Activo ? v.CategoriasTitulo === "HORNEADOS" : null
    let I = FiltroProceso.VEGETARIANOS.Activo ? v.CategoriasTitulo === "VEGETARIANOS" : null
    let J = FiltroProceso.PREMIUM.Activo ? v.CategoriasTitulo === "PREMIUM" : null
    let K = FiltroProceso.PLATILLOS.Activo ? v.CategoriasTitulo === "PLATILLOS" : null
    let L = FiltroProceso.RAMEN.Activo ? v.CategoriasTitulo === "RAMEN" : null
    let M = FiltroProceso.POSTRES.Activo ? v.CategoriasTitulo === "POSTRES" : null
    let N = FiltroProceso.BEBIDAS.Activo ? v.CategoriasTitulo === "BEBIDAS" : null
    let O = FiltroProceso.INFANTIL.Activo ? v.CategoriasTitulo === "INFANTIL" : null
    let P = FiltroProceso["ROLLO DEL MES"].Activo ? v.CategoriasTitulo === "ROLLO DEL MES" : null
    let Q = FiltroProceso.EXTRAS.Activo ? v.CategoriasTitulo === "EXTRAS" : null

    let S = v.ProductosTitulo.toLowerCase().includes(Search.toLowerCase())


    return S & (A || B || C || D || E || F || G || H || I || J || K || L || M || N || O || P || Q )

  }).map((row, index) => {

    return (
      <Renglon
        key={row.Id}
        Row={row}
        Color={"White"}
        i={index}
      />
    );
  });

  return (
    <div>






        <Flex>
          <Box sx={{ width: "100%" }}>{Renglones}</Box>
        </Flex>
    </div>
  );
};

// ------------------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0}}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            <Listado {...props}/>
          </div>
        }
      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------
