import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Solstream } from "../../utils/streaming";

export const program = anchor.workspace.Solstream as Program<Solstream>;
