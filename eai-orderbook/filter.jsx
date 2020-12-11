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
    LoadingSecc1: useState(useContext(createContext(false))),
    Extended: useState(useContext(createContext(false))),

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
  const [Extend, setExtend] = props.useContext.Extend.Filter
  const Images = props.useContext.Images


// ----------------------------------

const ModuloSlim  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Filtro
              </Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(true)
                }}
              >
                <Image src={Images.Flechad[0].src} />
              </Button>
            </Box>
          </Flex>

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------

const ModuloSimple  = () => {
 // console.log({Images})
  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%", mb:2 }}>
              <Text sx={Estilo.d1sb}>Filtro</Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(false)
                }}
              >
                <Image  src={Images.Flechau[0].src} />
              </Button>
            </Box>
          </Flex>

          <Filtros {...props} />
        </Box>
      </Flex>
    </div>
  )
}

// ------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.filter()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.filter()===1 & !Extend) ? ModuloSlim() : <div/>}
          </div>
        }

      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------

const Filtros = props => {
  const Estilo = useThemeUI().theme.styles;
  const [FiltroProceso, setFiltroProceso] = props.useContext.Filtro.Proceso



  const useChangeArray = (MiArray, Field, setField) => {
    return {
      name: Field,
      sx: {height: "34px", width: "100%"},
      bg: MiArray[Field].Activo ? MiArray[Field].Color : "gray",
      onClick: e => {
        setField({ ...MiArray, [Field]: {Activo: !MiArray[Field].Activo, Color: MiArray[Field].Color }})
      }
    };
  }

  

  return (
    <Grid sx={{p:2, m: 2}}>
      <Flex sx={{ width: "100%", bg: "White" }} columns={[1,null,2]}>

        <Box sx={{ width: "20%", m: 2 }}>
          <Button {...useChangeArray(FiltroProceso, "TOSTADAS", setFiltroProceso)}>
            Tostadas
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "ENTRADAS", setFiltroProceso)}>
            Entradas
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "SOPAS", setFiltroProceso)}>
            Sopas
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "ARROCES", setFiltroProceso)}>
            Arroces
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "POKES", setFiltroProceso)}>
            Pokes
          </Button>
        </Box>






      </Flex>

      <Flex sx={{ width: "100%", bg: "White" }} columns={[1,null,2]}>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "NATURALES", setFiltroProceso)}>
            Naturales
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "CALIENTES", setFiltroProceso)}>
            Calientes
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "HORNEADOS", setFiltroProceso)}>
            Horneados
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "VEGETARIANOS", setFiltroProceso)}>
            Vegetarianos
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "PREMIUM", setFiltroProceso)}>
            Premium
          </Button>
        </Box>

      </Flex>


      <Flex sx={{ width: "100%", bg: "White" }} columns={[1,null,2]}>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "PLATILLOS", setFiltroProceso)}>
            Platillos
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "RAMEN", setFiltroProceso)}>
            Ramen
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "POSTRES", setFiltroProceso)}>
            Postres
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "BEBIDAS", setFiltroProceso)}>
            Bebidas
          </Button>
        </Box>

        <Box sx={{ width: "20%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "INFANTIL", setFiltroProceso)}>
            Infantil
          </Button>
        </Box>

      </Flex>


      <Flex sx={{ width: "100%", bg: "White" }} columns={[1,null,2]}>

        <Box sx={{ width: "37%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "ROLLO DEL MES", setFiltroProceso)}>
            Rollo del Mes
          </Button>
        </Box>

        <Box sx={{ width: "18%", m:2 }}>
          <Button {...useChangeArray(FiltroProceso, "EXTRAS", setFiltroProceso)}>
            Extras
          </Button>
        </Box>

        <Box sx={{ width: "18%", m:2 }}>
          <Button 
            sx={{ height: "34px", bg: "grey", width: "100%" }}
            onClick={
              ()=>setFiltroProceso({
                TOSTADAS: {Activo: true, Color: "#4682B4"},
                ENTRADAS: {Activo: true, Color: "#4682B4"},
                SOPAS: {Activo: true, Color: "#4682B4"},
                ARROCES: {Activo: true, Color: "#4682B4"},
                POKES: {Activo: true, Color: "#4682B4"},
                NATURALES: {Activo: true, Color: "#F4A460"},
                CALIENTES: {Activo: true, Color: "#F4A460"},
                HORNEADOS: {Activo: true, Color: "#F4A460"},
                VEGETARIANOS: {Activo: true, Color: "#F4A460"},
                PREMIUM: {Activo: true, Color: "#F4A460"},
                PLATILLOS: {Activo: true, Color: "#C71585"},
                RAMEN: {Activo: true, Color: "#C71585"},
                POSTRES: {Activo: true, Color: "#C71585"},
                BEBIDAS: {Activo: true, Color: "#C71585"},
                INFANTIL: {Activo: true, Color: "#C71585"},
                "ROLLO DEL MES": {Activo: true, Color: "#66CDAA"},
                EXTRAS: {Activo: true, Color: "#66CDAA"},
                })
            }
        
              
              
              >
            Todos
          </Button>
        </Box>

        <Box sx={{ width: "18%", m:2 }}>
          <Button 
            sx={{ height: "34px", bg: "grey", width: "100%" }}
            onClick={
              ()=>setFiltroProceso({
                TOSTADAS: {Activo: false, Color: "#4682B4"},
                ENTRADAS: {Activo: false, Color: "#4682B4"},
                SOPAS: {Activo: false, Color: "#4682B4"},
                ARROCES: {Activo: false, Color: "#4682B4"},
                POKES: {Activo: false, Color: "#4682B4"},
                NATURALES: {Activo: false, Color: "#F4A460"},
                CALIENTES: {Activo: false, Color: "#F4A460"},
                HORNEADOS: {Activo: false, Color: "#F4A460"},
                VEGETARIANOS: {Activo: false, Color: "#F4A460"},
                PREMIUM: {Activo: false, Color: "#F4A460"},
                PLATILLOS: {Activo: false, Color: "#C71585"},
                RAMEN: {Activo: false, Color: "#C71585"},
                POSTRES: {Activo: false, Color: "#C71585"},
                BEBIDAS: {Activo: false, Color: "#C71585"},
                INFANTIL: {Activo: false, Color: "#C71585"},
                "ROLLO DEL MES": {Activo: false, Color: "#66CDAA"},
                EXTRAS: {Activo: false, Color: "#66CDAA"},
                })
            }
          

            >
            Ninguno
          </Button>
        </Box>
      </Flex>




    </Grid>
  );
};

// -----------------------------------------------------------------------------








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

