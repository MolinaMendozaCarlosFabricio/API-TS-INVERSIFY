import type { AuctionsDBRepository } from "../domain/repository/AuctionsDBRepository.js";
import { Auction } from "../domain/models/Auction.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types.js";

@injectable()
export class SetAuctionStatusUseCase {

    private repo: AuctionsDBRepository;

    constructor(
        @inject(TYPES.AuctionsDBRepository)
        repo: AuctionsDBRepository
    ) {
        this.repo = repo;
    }

    async execute(id: number, status: boolean): Promise<Auction> {

        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        if (typeof status !== "boolean") {
            throw new Error("Status inválido");
        }

        // Verificamos que exista
        const auction = await this.repo.getAuctionByID(id);

        // Actualizamos el estado
        const updatedAuction = await this.repo.setAuctionStatus(id, status);

        return updatedAuction;
    }
}