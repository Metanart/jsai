import { GridCellStatus, GridCoordinates, GridSize, GridSkeleton } from './GridTypes';

export class Grid {
    height: number;
    width: number;
    skeleton: GridSkeleton;

    constructor(size: GridSize) {
        this.height = size[0];
        this.width = size[1];
        this.skeleton = this.generateSkeleton();
    }

    generateSkeleton() {
        const grid = new Array(this.height).fill(0);

        for (let index = 0; index < grid.length; index++) {
            grid[index] = new Array(this.width).fill(0);
        }

        return grid;
    }

    checkCellsByCoordinates(coordinatesList: GridCoordinates[]): GridCoordinates[] | false {
        const results = coordinatesList
            .map((coordinates) => {
                const [rowIndex, cellIndex] = coordinates;
                return this.skeleton[rowIndex][cellIndex] === undefined ? false : coordinates;
            })
            .filter(Boolean) as GridCoordinates[];

        return results.length === coordinatesList.length ? results : false;
    }

    updateCellsByCoordinates(
        coordinatesList: GridCoordinates[],
        status: GridCellStatus = 0,
    ): GridCoordinates[] | false {
        const checkedCoordinates = this.checkCellsByCoordinates(coordinatesList);

        if (checkedCoordinates) {
            checkedCoordinates.map((coordinates) => {
                const [rowIndex, cellIndex] = coordinates;
                this.skeleton[rowIndex][cellIndex] = status;
            });
        }

        return checkedCoordinates;
    }

    getFreeCoordinates(itemSize: GridSize, initialRowIndex = 0, initialCellIndex = 0): GridCoordinates[] | false {
        const [itemHeight, itemWidth] = itemSize;

        const freeRowCoordinates = this.getFreeCoordinatesFromRows(itemWidth, initialRowIndex, initialCellIndex);

        if (freeRowCoordinates === false) return false;

        const freeColumnsCoordinates = this.getFreeCoordinatesFromColumns(itemHeight, freeRowCoordinates);

        if (freeColumnsCoordinates == false) return false;

        return [...freeRowCoordinates, ...freeColumnsCoordinates];
    }

    getFreeCoordinatesFromRow(
        requestedWidth: number,
        rowIndex: number,
        startCellIndex: number = 0,
    ): GridCoordinates[] | false {
        let results = [];
        const row = this.skeleton[rowIndex];

        for (let currentCellIndex = startCellIndex; currentCellIndex < row.length; currentCellIndex++) {
            if (row[currentCellIndex] === 0) {
                results.push([rowIndex, currentCellIndex] as GridCoordinates);
            } else {
                results = [];
            }

            if (results.length === requestedWidth) break;
        }

        return results.length === requestedWidth ? results : false;
    }

    getFreeCoordinatesFromRows(
        requestedWidth: number,
        initialRowIndex = 0,
        initialCellIndex = 0,
    ): GridCoordinates[] | false {
        let freeRowCoordinates: GridCoordinates[] | false = false;

        for (let currentRowIndex = initialRowIndex; currentRowIndex < this.skeleton.length; currentRowIndex++) {
            freeRowCoordinates = this.getFreeCoordinatesFromRow(requestedWidth, currentRowIndex, initialCellIndex);
            if (freeRowCoordinates) break;
        }

        return freeRowCoordinates;
    }

    getFreeCoordinatesFromColumn(
        requestedHeight: number,
        initialCellCoordinates: GridCoordinates,
    ): GridCoordinates[] | false {
        const [rowIndex, cellIndex] = initialCellCoordinates;

        const currentCellIndex = cellIndex;
        const columnIndexStart = rowIndex;
        const columnIndexEnd = columnIndexStart + requestedHeight;

        if (this.skeleton.length < columnIndexEnd) return false;

        let results = [];

        for (let currentRowIndex = columnIndexStart; currentRowIndex < columnIndexEnd; currentRowIndex++) {
            const cell = this.skeleton[currentRowIndex][currentCellIndex];

            if (cell === 0) {
                results.push([currentRowIndex, currentCellIndex] as GridCoordinates);
            } else break;
        }

        return results.length === requestedHeight ? results : false;
    }

    getFreeCoordinatesFromColumns(
        requestedHeight: number,
        freeRowCoordinates: GridCoordinates[],
    ): GridCoordinates[] | false {
        let freeColumnsCoordinates: GridCoordinates[] = [];

        for (let currentRowIndex = 0; currentRowIndex < freeRowCoordinates.length; currentRowIndex++) {
            const freeColumnCoordinates = this.getFreeCoordinatesFromColumn(
                requestedHeight,
                freeRowCoordinates[currentRowIndex],
            );

            if (!freeColumnCoordinates) return false;

            freeColumnsCoordinates = [...freeColumnCoordinates, ...freeColumnsCoordinates];
        }

        return freeColumnsCoordinates;
    }
}
