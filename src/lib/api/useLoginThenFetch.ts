import { useState, useEffect } from "react";
import { Options } from "./types";


export const useLoginThenFetch = <TData = any, VData = any>(optionsT: Options, optionsV: Options, auth: string) => {
    const [stateT, useStateT] = useState<TData>()
}