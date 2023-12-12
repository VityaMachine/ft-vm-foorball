"use client";

import { useContext, useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  TableBody,
  IconButton,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { styled } from "@mui/material/styles";

import { LanguageContext } from "@/context/LanguageContext";
import { standingsTableRows } from "@/configs/standingTableConfigs";
import Link from "next/link";
import Image from "next/image";
import EnchancedTableCell from "@/components/ui/EnchancedTableCell/EnchancedTableCell";

import { sortTableDataHandler } from "@/helpers/leagueStandingsHelpers";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#374551" : "#1565C0",
}));

export default function LeagueStandingsTable({
  leagueData,
}: {
  leagueData: ITeamResultsFromFixtures[] | null;
}) {
  const [sortField, setSortField] =
    useState<keyof ISortingResultsData>("position");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [visibleTableData, setVisibleTableData] = useState<
    ITeamResultsFromFixtures[] | null
  >(leagueData);

  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setVisibleTableData((prevData) => {
      if (leagueData !== null) {
        if (prevData === null) {
          return sortTableDataHandler(leagueData, sortField, sortDirection);;
        } else {
          return sortTableDataHandler(prevData, sortField, sortDirection);
        }
      } else {
        return null;
      }
    });
  }, [leagueData, sortDirection, sortField]);

  const sortTableHandler = (sortRow: keyof ISortingResultsData) => {
    if (sortRow === sortField) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    }
    if (sortRow !== sortField) {
      setSortField(sortRow);
      setSortDirection(() => {
        return ["position", "teamName"].includes(sortRow) ? "asc" : "desc";
      });
    }
  };

  return (
    <Box
      sx={{
        mt: "35px",
        // overflowX: 'scroll',
      }}
    >
      {/* new table */}
      {/* <TableContainer sx={{
        width: 200
      }}>
        <Table>
          <StyledTableHead>
            <TableRow>
              {infoRows.map((row) => (
                <Tooltip
                  key={row.id}
                  placement={row.tooltipPos}
                  title={
                    <Typography
                      sx={{
                        cursor: "default",
                      }}
                    >
                      {language === "ua"
                        ? row.content.ua.textLong
                        : row.content.en.textLong}
                    </Typography>
                  }
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  }}
                >
                  <TableCell
                    sx={{
                      "&:first-child": {
                        pl: "5px",
                      },
                      "&:last-child": {},
                      py: "3px",
                    }}
                    padding="none"
                    align={row.textAlign}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "700",
                        fontSize: "14px",
                        color: "#fff",
                        width: "50px",
                        cursor: "default",
                      }}
                    >
                      {language === "ua"
                        ? row.content.ua.textShort
                        : row.content.en.textShort}
                    </Typography>
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </StyledTableHead>
        </Table>
      </TableContainer> */}

      {/* old table */}

      <TableContainer
        sx={{
          width: 850,
        }}
      >
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              {standingsTableRows.map((row) => (
                <TableCell
                  padding="none"
                  sx={{
                    py: "5px",
                  }}
                  key={row.id}
                >
                  <Tooltip
                    placement={row.tooltipPos}
                    title={
                      <Typography
                        sx={{
                          cursor: "default",
                        }}
                      >
                        {language === "ua"
                          ? row.content.ua.textLong
                          : row.content.en.textLong}
                      </Typography>
                    }
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -6],
                          },
                        },
                      ],
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: row.textAlign,
                        "&:first-child": {
                          pl: "5px",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            color: "#fff",
                            pr: "8px",
                            cursor: "default",
                          }}
                        >
                          {language === "ua"
                            ? row.content.ua.textShort
                            : row.content.en.textShort}
                        </Typography>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor:
                              sortField === row.fieldName
                                ? "rgba(0,0,0,0.4)"
                                : "rgba(0,0,0,0.15)",
                          }}
                          onClick={() => sortTableHandler(row.fieldName)}
                        >
                          {sortField === row.fieldName ? (
                            (["position", "teamName"].includes(sortField) &&
                              sortDirection === "asc" && (
                                <KeyboardArrowDownIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                    fill: "#fff",
                                  }}
                                />
                              )) ||
                            (["position", "teamName"].includes(sortField) &&
                              sortDirection === "desc" && (
                                <KeyboardArrowUpIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                    fill: "#fff",
                                  }}
                                />
                              )) ||
                            (!["position", "teamName"].includes(sortField) &&
                              sortDirection === "asc" && (
                                <KeyboardArrowUpIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                    fill: "#fff",
                                  }}
                                />
                              )) ||
                            (!["position", "teamName"].includes(sortField) &&
                              sortDirection === "desc" && (
                                <KeyboardArrowDownIcon
                                  sx={{
                                    width: "12px",
                                    height: "12px",
                                    fill: "#fff",
                                  }}
                                />
                              ))
                          ) : (
                            <KeyboardArrowDownIcon
                              sx={{
                                width: "12px",
                                height: "12px",
                                fill: "#fff",
                              }}
                            />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {visibleTableData &&
              visibleTableData.map(
                (team) =>
                  team && (
                    <TableRow key={team.teamId}>
                      {/* position */}
                      <TableCell>{team.leaguePosition}</TableCell>
                      {/* team logo and name */}
                      <TableCell padding="none">
                        <Link href={`/teams/${team.teamId}`}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Box>
                              <Image
                                src={team.teamLogo ? team.teamLogo : ""}
                                width={25}
                                height={25}
                                alt={team.teamName ? team.teamName : ""}
                              />
                            </Box>
                            <Typography sx={{ ml: "10px" }}>
                              {team.teamName}
                            </Typography>
                          </Box>
                        </Link>
                      </TableCell>

                      {/* games */}
                      <EnchancedTableCell
                        team={team}
                        field="games"
                        toolTipvalue="finalScore"
                      />

                      {/* win */}
                      <EnchancedTableCell
                        team={team}
                        field="win"
                        toolTipvalue="finalScore"
                      />

                      {/* draw */}
                      <EnchancedTableCell
                        team={team}
                        field="draw"
                        toolTipvalue="finalScore"
                      />

                      {/* draw */}
                      <EnchancedTableCell
                        team={team}
                        field="lose"
                        toolTipvalue="finalScore"
                      />

                      {/* goals scored */}
                      <EnchancedTableCell
                        team={team}
                        field="goalsFor"
                        toolTipvalue="goalsFor"
                      />

                      {/* goals conceded */}
                      <EnchancedTableCell
                        team={team}
                        field="goalsAgainst"
                        toolTipvalue="goalsAgainst"
                      />

                      {/* goals diff */}
                      <EnchancedTableCell
                        team={team}
                        field="goalsDiff"
                        toolTipvalue="goalsDiff"
                      />

                      {/* points */}
                      <EnchancedTableCell
                        team={team}
                        field="points"
                        toolTipvalue="points"
                      />
                    </TableRow>
                  )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
