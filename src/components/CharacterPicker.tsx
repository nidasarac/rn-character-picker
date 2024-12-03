import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useCharacters } from "../hooks/api";
import { useMultiSelectStore } from "../store/store";
import Checkbox from "expo-checkbox";

const CharacterPicker = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  const { data, isLoading, isError, error } = useCharacters(query);
  const characters = data?.results || [];
  const { selectedCharacters, addCharacter, removeCharacter } =
    useMultiSelectStore();

  const handleSelect = (character: any) => {
    if (selectedCharacters.some((c) => c.id === character.id)) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
  };

  const handleOpenModal = (character: any) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  const highlightText = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`\\b${query}`, "i"); // Kelime başlangıçlarında arama
    if (!regex.test(text)) return text; // Eğer eşleşme yoksa, orijinal metni döndür

    const parts = text.split(regex); // Kelime başlangıcına göre böl
    return (
      <>
        {parts.map((part, index) =>
          index === 0 ? (
            <Text key={index}>
              {part}
              <Text style={styles.highlight}>{query}</Text>
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </>
    );
  };

  const filteredCharacters = characters.filter((character: any) =>
    new RegExp(`\\b${query}`, "i").test(character.name)
  );

  return (
    <View style={styles.container}>
      <View style={styles.selectedContainer}>
        <TextInput
          value={query}
          onChangeText={(text) => setQuery(text)}
          onFocus={() => setDropdownOpen(true)}
          style={styles.input}
          placeholder="Search characters..."
        />
        {selectedCharacters.length > 0 && (
          <>
            <View style={styles.selectedList}>
              {selectedCharacters.map((character) => (
                <View key={character.id} style={styles.tag}>
                  <Text style={styles.text}>{character.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeCharacter(character.id)}
                  >
                    <Text style={styles.removeTag}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {isLoading ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          ) : characters.length === 0 ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>
                No characters found.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Checkbox
                    value={selectedCharacters.some((c) => c.id === item.id)}
                    onValueChange={() => handleSelect(item)}
                    style={styles.checkbox}
                  />

                  <Image
                    source={{ uri: item.image }}
                    style={styles.characterImage}
                  />
                  <View style={styles.characterInfo}>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.text}>
                        {highlightText(item.name)}
                      </Text>
                      <Text style={styles.text}>
                        {item.episode.length} Episodes
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.episodeButton}
                      onPress={() => handleOpenModal(item)}
                    >
                      <Text style={styles.episodeButtonText}>Episodes</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Episodes for {selectedCharacter?.name}
          </Text>
          <FlatList
            data={selectedCharacter?.episode}
            keyExtractor={(item) => item.toString()}
            contentContainerStyle={{ paddingHorizontal: 50 }}
            renderItem={({ item }) => {
              const episodeNumber = item.split("/").pop();
              return (
                <Text style={styles.episodeName}>Episode {episodeNumber}</Text>
              );
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    paddingBottom: 60,
  },
  selectedContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    gap: 10,
    flexDirection: "column",
  },
  selectedList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBE3ED",
    borderRadius: 15,
    margin: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeTag: {
    marginLeft: 5,
    color: "#fff",
    padding: 3,
    paddingHorizontal: 4,
    backgroundColor: "#8291A9",
    borderRadius: 5,
  },
  input: {
    minWidth: 100,
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  characterImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  characterInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highlight: {
    fontWeight: "900",
    color: "#374356",
  },
  episodeButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  episodeButtonText: {
    color: "white",
  },
  checkbox: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    paddingVertical: 80,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  episodeName: {
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
  text: {
    color: "#374356",
  },
});

export default CharacterPicker;
