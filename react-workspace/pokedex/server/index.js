import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, redirect, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component2, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
function Head() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("link", {
      rel: "icon",
      type: "image/png",
      href: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
    }), /* @__PURE__ */ jsx("title", {
      children: "Pokédex"
    })]
  });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Head,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Component() {
  return null;
}
async function loader$2() {
  return redirect("/pokemon");
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const layout = withComponentProps(function Layout2() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-b from-red-500 to-red-600",
    children: /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto px-4 py-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg",
        children: "Pokédex"
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6",
        children: /* @__PURE__ */ jsx(Outlet, {})
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
const typeColors$1 = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-orange-400 to-orange-600",
  water: "from-blue-400 to-blue-600",
  grass: "from-green-400 to-green-600",
  electric: "from-yellow-300 to-yellow-500",
  ice: "from-cyan-300 to-cyan-500",
  fighting: "from-red-400 to-red-600",
  poison: "from-purple-400 to-purple-600",
  ground: "from-amber-400 to-amber-600",
  flying: "from-indigo-300 to-indigo-500",
  psychic: "from-pink-400 to-pink-600",
  bug: "from-lime-400 to-lime-600",
  rock: "from-stone-400 to-stone-600",
  ghost: "from-violet-400 to-violet-600",
  dark: "from-gray-600 to-gray-800",
  dragon: "from-indigo-500 to-indigo-700",
  steel: "from-slate-400 to-slate-600",
  fairy: "from-pink-300 to-pink-500"
};
function PokemonCard({ pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const gradientClass = typeColors$1[mainType];
  return /* @__PURE__ */ jsx(Link, { to: `/pokemon/${pokemon.id}`, children: /* @__PURE__ */ jsxs("div", { className: `relative rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br ${gradientClass}`, children: [
    /* @__PURE__ */ jsxs("span", { className: "absolute top-3 right-3 text-lg font-bold text-white/70", children: [
      "#",
      String(pokemon.id).padStart(3, "0")
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative aspect-square mb-4", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: pokemon.sprites.other["official-artwork"].front_default,
        alt: pokemon.name,
        className: "w-full h-full object-contain drop-shadow-lg",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold capitalize mb-2 text-white", children: pokemon.name }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 justify-center flex-wrap", children: pokemon.types.map((type) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium capitalize backdrop-blur-sm",
          children: type.type.name
        },
        type.type.name
      )) })
    ] })
  ] }) });
}
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1e3 * (i + 1)));
    }
  }
}
async function loader$1() {
  try {
    const data = await fetchWithRetry("https://pokeapi.co/api/v2/pokemon?limit=20");
    const pokemonUrls = data.results.map((pokemon) => pokemon.url);
    const pokemonDetails = await Promise.all(pokemonUrls.map((url) => fetchWithRetry(url).catch(() => null)));
    const validPokemon = pokemonDetails.filter((pokemon) => pokemon !== null);
    return {
      pokemon: validPokemon,
      nextOffset: 20,
      total: 151
    };
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw new Error("Failed to load Pokemon list. Please try again later.");
  }
}
const index = withComponentProps(function PokemonList() {
  const {
    pokemon: initialPokemon,
    nextOffset,
    total
  } = useLoaderData();
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [offset, setOffset] = useState(nextOffset);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && offset < total) {
        setLoading(true);
        try {
          const data = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
          const newPokemonDetails = await Promise.all(data.results.map((p) => fetchWithRetry(p.url).catch(() => null)));
          const validNewPokemon = newPokemonDetails.filter((p) => p !== null);
          setPokemon((prev) => [...prev, ...validNewPokemon]);
          setOffset((prev) => prev + 20);
        } catch (error) {
          console.error("Error loading more Pokemon:", error);
        } finally {
          setLoading(false);
        }
      }
    }, {
      threshold: 0.1
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [offset, loading]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center mb-6 bg-black/20 p-4 rounded-lg shadow-lg",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-2xl font-bold text-white",
        children: "Generation I"
      }), /* @__PURE__ */ jsxs("span", {
        className: "text-white bg-black/20 px-3 py-1 rounded-full text-sm",
        children: [pokemon.length, " / ", total, " Pokémon"]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      children: pokemon.map((pokemon2) => /* @__PURE__ */ jsx(PokemonCard, {
        pokemon: pokemon2
      }, pokemon2.id))
    }), offset < total && /* @__PURE__ */ jsx("div", {
      ref: loaderRef,
      className: "mt-8 p-4 text-center",
      children: loading ? /* @__PURE__ */ jsx("div", {
        className: "inline-block animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"
      }) : /* @__PURE__ */ jsx("div", {
        className: "h-8"
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const typeColors = {
  normal: "from-gray-400 to-gray-500",
  fire: "from-orange-400 to-orange-600",
  water: "from-blue-400 to-blue-600",
  grass: "from-green-400 to-green-600",
  electric: "from-yellow-300 to-yellow-500",
  ice: "from-cyan-300 to-cyan-500",
  fighting: "from-red-400 to-red-600",
  poison: "from-purple-400 to-purple-600",
  ground: "from-amber-400 to-amber-600",
  flying: "from-indigo-300 to-indigo-500",
  psychic: "from-pink-400 to-pink-600",
  bug: "from-lime-400 to-lime-600",
  rock: "from-stone-400 to-stone-600",
  ghost: "from-violet-400 to-violet-600",
  dark: "from-gray-600 to-gray-800",
  dragon: "from-indigo-500 to-indigo-700",
  steel: "from-slate-400 to-slate-600",
  fairy: "from-pink-300 to-pink-500"
};
function PokemonDetail({ pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const gradientClass = typeColors[mainType];
  return /* @__PURE__ */ jsx("div", { className: `rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br ${gradientClass}`, children: /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-square bg-white/20 rounded-xl p-4 backdrop-blur-sm", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: pokemon.sprites.other["official-artwork"].front_default,
        alt: pokemon.name,
        className: "w-full h-full object-contain drop-shadow-lg animate-float"
      }
    ) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/20 backdrop-blur-sm rounded-xl p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold capitalize text-white", children: pokemon.name }),
        /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-white/70", children: [
          "#",
          String(pokemon.id).padStart(3, "0")
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-8", children: pokemon.types.map((type) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "px-4 py-1 rounded-full bg-white/30 text-white text-sm font-medium capitalize",
          children: type.type.name
        },
        type.type.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-white", children: "Base Stats" }),
          pokemon.stats.map((stat) => /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "capitalize text-white/80", children: stat.stat.name.replace("-", " ") }),
              /* @__PURE__ */ jsx("span", { className: "text-white font-medium", children: stat.base_stat })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-black/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-full bg-white/70 rounded-full transition-all duration-1000",
                style: { width: `${stat.base_stat / 255 * 100}%` }
              }
            ) })
          ] }, stat.stat.name))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm text-white/70 mb-1", children: "Height" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-medium text-white", children: [
              (pokemon.height / 10).toFixed(1),
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/10 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm text-white/70 mb-1", children: "Weight" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-medium text-white", children: [
              (pokemon.weight / 10).toFixed(1),
              "kg"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-white", children: "Abilities" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: pokemon.abilities.map((ability) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-4 py-2 bg-white/10 rounded-lg text-white text-sm capitalize",
              children: ability.ability.name.replace("-", " ")
            },
            ability.ability.name
          )) })
        ] })
      ] })
    ] }) })
  ] }) }) });
}
async function loader({
  params
}) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }
  return {
    pokemon: await response.json()
  };
}
const detail = withComponentProps(function Detail() {
  const {
    pokemon
  } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsxs(Link, {
      to: "/pokemon",
      className: "inline-flex items-center px-4 py-2 rounded-lg bg-black/20 text-white font-medium hover:bg-black/30 transition-all duration-200 mb-6 group shadow-lg",
      children: [/* @__PURE__ */ jsx("svg", {
        className: "w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M15 19l-7-7 7-7"
        })
      }), "Back to List"]
    }), /* @__PURE__ */ jsx(PokemonDetail, {
      pokemon
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: detail,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/react-workspace/pokedex/assets/entry.client-CeRRRMtl.js", "imports": ["/react-workspace/pokedex/assets/chunk-K6CSEXPM-C8WhipqY.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/react-workspace/pokedex/assets/root-BkH2fYaW.js", "imports": ["/react-workspace/pokedex/assets/chunk-K6CSEXPM-C8WhipqY.js", "/react-workspace/pokedex/assets/jsx-runtime-Bt6zTnZ3.js"], "css": ["/react-workspace/pokedex/assets/root-Bi8xJt6r.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/root": { "id": "routes/root", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/react-workspace/pokedex/assets/root-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pokemon/layout": { "id": "routes/pokemon/layout", "parentId": "root", "path": "/pokemon", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/react-workspace/pokedex/assets/layout-BGj5ioNd.js", "imports": ["/react-workspace/pokedex/assets/jsx-runtime-Bt6zTnZ3.js", "/react-workspace/pokedex/assets/chunk-K6CSEXPM-C8WhipqY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pokemon/index": { "id": "routes/pokemon/index", "parentId": "routes/pokemon/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/react-workspace/pokedex/assets/index-CG-v6t3U.js", "imports": ["/react-workspace/pokedex/assets/jsx-runtime-Bt6zTnZ3.js", "/react-workspace/pokedex/assets/chunk-K6CSEXPM-C8WhipqY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pokemon/detail": { "id": "routes/pokemon/detail", "parentId": "routes/pokemon/layout", "path": ":id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/react-workspace/pokedex/assets/detail-C14hlCL1.js", "imports": ["/react-workspace/pokedex/assets/jsx-runtime-Bt6zTnZ3.js", "/react-workspace/pokedex/assets/chunk-K6CSEXPM-C8WhipqY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/react-workspace/pokedex/assets/manifest-15cfcd34.js", "version": "15cfcd34" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/react-workspace/pokedex/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/root": {
    id: "routes/root",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/pokemon/layout": {
    id: "routes/pokemon/layout",
    parentId: "root",
    path: "/pokemon",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/pokemon/index": {
    id: "routes/pokemon/index",
    parentId: "routes/pokemon/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/pokemon/detail": {
    id: "routes/pokemon/detail",
    parentId: "routes/pokemon/layout",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
