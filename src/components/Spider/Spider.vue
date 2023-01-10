<script>
import game from "./game";

export default {
  name: "app",
  data() {
    return {
      intervalDungeonMessages: null,
      pendingMessages: [],
      text: "",
      session: null,
      participants: [
        {
          id: "me",
          name: "Me",
          imageUrl: `${import.meta.env.BASE_URL}/me.png`,
        },
        {
          id: "dungeon",
          name: "Dungeon Master",
          imageUrl: `${import.meta.env.BASE_URL}/dungeon_master.png`,
        },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: `${import.meta.env.BASE_URL}/spider.png`,
      messageList: [
        {
          type: "text",
          author: `dungeon`,
          data: {
            text: `Escribe el comando \n\`iniciar.\` \npara comenzar tu aventura. No olvides de poner un punto al final de cada comando, sino invalidaré tu comando 😛.`,
          },
        },
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "hsla(100, 100%, 48%, 0.10)",
          text: "#ffffff",
        },
        launcher: {
          bg: "hsla(170, 100%, 18%, 0.37)",
        },
        messageList: {
          bg: "#ffffff00",
        },
        sentMessage: {
          bg: "rgb(42 145 0 / 40%)",
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867",
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  mounted() {
    this.session = pl.create();
    this.session.consult(game, {
      success: function () {
        // Query;
      },
      error: function (err) {
        printChat("Comando inválido 😛", err);
      },
    });

    printChat = (text) => {
      this.pendingMessages.push(text);
    };
    this.intervalDungeonMessages = setInterval(() => {
      if (this.pendingMessages.length == 0) return;

      if (this.showTypingIndicator == "") {
        this.showTypingIndicator = "dungeon";
        return;
      }

      this.sendDungeonMessage(this.pendingMessages[0]);
      this.pendingMessages = this.pendingMessages.slice(1);
      if (this.pendingMessages.length > 0) {
        this.showTypingIndicator = "dungeon";
      } else {
        this.showTypingIndicator = "";
      }
    }, 700);
  },
  unmounted() {
    clearInterval(this.intervalDungeonMessages);
  },
  methods: {
    execute(message) {
      const session = this.session;
      session.query(`${message}`, {
        success: function (goal) {
          session.answer({
            success: function (answer) {
              /* Answer */
            },
            error: function (err) {
              printChat("Comando inválido 😛", err);
              /* Uncaught error */
            },
            fail: function (a) {
              printChat("Comando inválido 😛", a);
              /* Fail */
            },
            limit: function () {
              /* Limit exceeded */
            },
          });
        },
        error: function (err) {
          printChat("Comando inválido 😛", err);
        },
      });
    },
    sendDungeonMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "dungeon",
          type: "text",
          data: { text },
        });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
      if (message.author == "me") this.execute(message.data.text);
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {},
    editMessage(message) {
      const m = this.messageList.find((m) => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
  },
};
</script>

<template>
  <div>
    <RouterLink class="close" :to="{ name: 'home' }">X</RouterLink>
    <div
      class="container"
      :style="{
        display: 'flex',
        alignItems: 'center',
        height: '600px',
        justifyContent: 'center',
      }"
    >
      <beautiful-chat
        class="chat"
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="true"
        :close="closeChat"
        :icons="{}"
        :open="openChat"
        :showEmoji="false"
        :showFile="false"
        :showEdition="false"
        :showDeletion="true"
        :showTypingIndicator="showTypingIndicator"
        :showLauncher="false"
        :showCloseButton="false"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom"
        :disableUserListToggle="false"
        :messageStyling="messageStyling"
        @onType="handleOnType"
        @edit="editMessage"
        :style="{
          zIndex: 10,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }"
      >
        <template v-slot:header> Spider </template>
      </beautiful-chat>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .container {
    display: flex;
    justify-content: "start";
  }
}

@media (max-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
  .container {
    display: flex;
    align-items: center;
  }
}
.close {
  display: none;
}

@media (max-width: 450px) {
  .chat {
    background-color: transparent;
  }
  .container {
    background-color: transparent;
    left: 0px;
    top: 0px;
    position: fixed !important;
    height: 100% !important;
    width: 100%;
    justify-content: "center";
  }
  .close {
    display: flex;
    position: fixed;
    width: 30px;
    height: 30px;
    align-content: center;
    align-items: center;
    justify-content: center;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 1px 1px 1px white;
    z-index: 12;
  }
}

::v-deep(.sc-chat-window) {
  background-color: transparent;
  backdrop-filter: blur(2px);
  position: relative;
  right: auto;
  height: 100%;
  bottom: auto;
}
::v-deep(strong) {
  font-weight: bold;
}

.close:hover {
  transform: scale(1.1);
  box-shadow: 1px 1px 10px white;
  color: black;
}
</style>
