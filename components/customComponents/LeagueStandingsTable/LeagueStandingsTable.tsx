"use client";

import { useState, useContext } from "react";
import { useParams } from "next/navigation";

import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import { LanguageContext } from "@/context/LanguageContext";

import { styles } from "./styles";
import DesktopAndMobileTable from "./DesktopAndMobileTable";

import { teamsResultsFromFixtures } from "@/helpers/leagueStandingsHelpers";

import leaagueCorrections from "@/constants/leagues.corrections";
import { StyledTableHead } from "./StyledTableHead";

import { isTooltippedPlace } from "@/helpers/leagueStandingsHelpers";

import { tournamentsConfigs } from "@/configs/tournaments";

const stylesChip = {
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
  },
  px: "3px",
  mx: "6px",
};
export default function LeagueStandingsTable({
  fixturesData,
}: {
  fixturesData: IFixtureData[];
}) {
  const [matchesToShow, setMatchesToShow] = useState<"all" | "home" | "away">(
    "all"
  );

  const params = useParams();
  const leagueParams: ILeagueConfig | undefined =
    tournamentsConfigs.leagues.find(
      (league) => league.shortName === params.leagueName
    );

  const { language } = useContext(LanguageContext);

  const leagueData = teamsResultsFromFixtures(
    fixturesData,
    leaagueCorrections,
    matchesToShow
  );

  const shortFromLongNameHelper = (leagueData: ITeamResultsFromFixtures[]) => {
    const teamNames = leagueData.map((item) => item.teamNameOriginal);

    const shortNames = teamNames.map((item) => {
      if (item) {
		const filteredNames = item.split(' ').filter(item => 
			  ![
                    "CF",
                    "AC",
                    "AS",
                    "RB",
                    "VfB",
                    "1899",
                    "SC",
                    "VfL",
                    "FC",
					"FSV",
					"05",
					"SV",
					"98",
					'29',
					"LE",
					"Stade",
					'Foot',
					"KR",
					'Donetsk',
					'Kyiv',
					'Lviv',
					'Poltava',
					'Kovalivka',
					'Cherkasy',
					'Luhansk',
					'Rivne'
                  ].includes(item)
			
			
			)

		return filteredNames


        // if (item.split(" ").length > 1) {
        //   if (item.split(" ").length === 2) {
        //     const nameItems = item
        //       .split(" ")
        //       .filter(
        //         (item) =>
        //           ![
        //             "CF",
        //             "AC",
        //             "AS",
        //             "RB",
        //             "VfB",
        //             "1899",
        //             "SC",
        //             "VfL",
        //             "FC",
        //           ].includes(item)
        //       );

        //     return nameItems;
        //   }

        //   return item;
        // }

        // return item.slice(0, 3).toUpperCase();
      }
    });

    return { teamNames, shortNames };
  };

  const nnLeagData = shortFromLongNameHelper(leagueData);

  console.log(nnLeagData);

  return (
    <Box sx={styles.mainContainer}>
      {/* home away all buttons */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "25px",
            // mb: '15px'
          }}
        >
          <Chip
            label={language === "ua" ? "Всі" : "All"}
            clickable
            size="small"
            variant={matchesToShow === "all" ? "filled" : "outlined"}
            sx={stylesChip}
            color="warning"
            onClick={() => setMatchesToShow("all")}
          />

          <Chip
            label={language === "ua" ? "Дома" : "Home"}
            clickable
            size="small"
            variant={matchesToShow === "home" ? "filled" : "outlined"}
            sx={stylesChip}
            color="warning"
            onClick={() => setMatchesToShow("home")}
          />

          <Chip
            label={language === "ua" ? "Виїзд" : "Away"}
            clickable
            size="small"
            variant={matchesToShow === "away" ? "filled" : "outlined"}
            sx={stylesChip}
            color="warning"
            onClick={() => setMatchesToShow("away")}
          />
        </Box>
      </Box>

      {/* desktop and tablet */}
      <Box sx={styles.desktopTabletContainer}>
        <DesktopAndMobileTable leagueData={leagueData} />
      </Box>

      {/* mobile */}
      <Box
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
      >
        <TableContainer>
          <Table size="small">
            <StyledTableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Team
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  M
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  (W/D/L)
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  GS/GA
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  P
                </TableCell>
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {leagueData.map((teamItem) => (
                <TableRow key={teamItem.teamId}>
                  <TableCell>
                    {isTooltippedPlace(teamItem, leagueParams) ? (
                      <Box
                        sx={styles.infoTableBodyPlace(teamItem, leagueParams)}
                      >
                        {teamItem.leaguePosition}
                      </Box>
                    ) : (
                      <Box
                        sx={styles.infoTableBodyPlace(teamItem, leagueParams)}
                      >
                        {teamItem.leaguePosition}
                      </Box>
                    )}
                  </TableCell>

                  <TableCell padding="none">
                    <Link href={`/teams/${teamItem.teamId}`}>
                      <Box sx={styles.infoTableBodyTeamNameCellBox}>
                        <Box>
                          <Image
                            src={teamItem.teamLogo ? teamItem.teamLogo : ""}
                            width={25}
                            height={25}
                            alt={
                              teamItem.teamNameOriginal
                                ? teamItem.teamNameOriginal
                                : ""
                            }
                          />
                        </Box>
                        <Typography
                          sx={{
                            ml: "10px",
                          }}
                        >
                          {teamItem.teamNameData
                            ? language === "ua"
                              ? teamItem.teamNameData.shortName.ua
                              : teamItem.teamNameData.shortName.en
                            : teamItem.teamNameOriginal}
                        </Typography>
                      </Box>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
