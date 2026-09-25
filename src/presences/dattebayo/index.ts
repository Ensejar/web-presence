import { Presence } from "presence-api";

const presence = new Presence({
  clientId: "123456789012345678"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    largeImageText: "Dattebayo BR"
  };

  const titleElement = document.querySelector("h1") || document.querySelector(".entry-title");
  const animeTitle = titleElement?.textContent?.trim() || document.title;
  const video = document.querySelector("video") as HTMLVideoElement;

  if (video && !isNaN(video.duration)) {
    presenceData.details = animeTitle;

    if (!video.paused) {
      presenceData.state = "A assistir";
      presenceData.startTimestamp = Math.floor(Date.now() / 1000) - Math.floor(video.currentTime);
      presenceData.endTimestamp = Math.floor(Date.now() / 1000) + Math.floor(video.duration - video.currentTime);
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Em reprodução";
    } else {
      presenceData.state = "Pausado";
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "Pausado";
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else {
    presenceData.details = "A navegar no Dattebayo";
    presenceData.state = animeTitle !== "Dattebayo BR" ? animeTitle : "Procurando um anime";
  }

  presence.setActivity(presenceData);
});
