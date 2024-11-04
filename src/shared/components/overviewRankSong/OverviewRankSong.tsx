import data from "../../../data/mockTableData";
import styles from "./styles.module.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OverviewRankSong = () => {
  return (
    <div className={styles["outer-container"]}>
      <div className={styles.container}>
        <Table>
          <TableHeader className="h-16 font-bold bg-slate-100">
            <TableRow>
              <TableHead className="text-black w-[200px] font-bold">Song Title</TableHead>
              <TableHead className="font-bold text-black">Album</TableHead>
              <TableHead className="font-bold text-black w-[100px]">Likes</TableHead>
              <TableHead className="text-right text-black font-bold">Plays/Streams</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((song) => (
              <TableRow key={song.id} className="h-20">
                <TableCell className="font-medium truncate max-w-[100px]">{song.songTitle}</TableCell>
                <TableCell>{song.album}</TableCell>
                <TableCell className="w-[100px]">{song.likes}</TableCell>
                <TableCell className="text-right">{song.streams}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OverviewRankSong;
