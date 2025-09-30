import React, { createContext, useContext, useReducer, useCallback } from 'react'

// Initial state
const initialState = {
  currentImage: null,
  generatedImages: [],
  gallery: [],
  isLoading: false,
  error: null,
  editHistory: [],
  activeFilters: {},
  canvasRef: null,
  selectedTool: 'brush'
}

// Action types
const actionTypes = {
  SET_CURRENT_IMAGE: 'SET_CURRENT_IMAGE',
  ADD_GENERATED_IMAGE: 'ADD_GENERATED_IMAGE',
  ADD_TO_GALLERY: 'ADD_TO_GALLERY',
  REMOVE_FROM_GALLERY: 'REMOVE_FROM_GALLERY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  UNDO_LAST_ACTION: 'UNDO_LAST_ACTION',
  APPLY_FILTER: 'APPLY_FILTER',
  REMOVE_FILTER: 'REMOVE_FILTER',
  SET_CANVAS_REF: 'SET_CANVAS_REF',
  SET_SELECTED_TOOL: 'SET_SELECTED_TOOL',
  RESET_STATE: 'RESET_STATE'
}

// Reducer function
const imageReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_IMAGE:
      return {
        ...state,
        currentImage: action.payload,
        error: null
      }

    case actionTypes.ADD_GENERATED_IMAGE:
      return {
        ...state,
        generatedImages: [action.payload, ...state.generatedImages],
        currentImage: action.payload,
        error: null
      }

    case actionTypes.ADD_TO_GALLERY:
      const existingIndex = state.gallery.findIndex(img => img.id === action.payload.id)
      if (existingIndex >= 0) {
        const updatedGallery = [...state.gallery]
        updatedGallery[existingIndex] = action.payload
        return { ...state, gallery: updatedGallery }
      }
      return {
        ...state,
        gallery: [action.payload, ...state.gallery]
      }

    case actionTypes.REMOVE_FROM_GALLERY:
      return {
        ...state,
        gallery: state.gallery.filter(img => img.id !== action.payload)
      }

    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }

    case actionTypes.ADD_TO_HISTORY:
      return {
        ...state,
        editHistory: [...state.editHistory, action.payload].slice(-20) // Keep last 20 actions
      }

    case actionTypes.UNDO_LAST_ACTION:
      if (state.editHistory.length > 0) {
        const newHistory = [...state.editHistory]
        const lastState = newHistory.pop()
        return {
          ...state,
          editHistory: newHistory,
          currentImage: lastState.image,
          activeFilters: lastState.filters || {}
        }
      }
      return state

    case actionTypes.APPLY_FILTER:
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [action.payload.name]: action.payload.value
        }
      }

    case actionTypes.REMOVE_FILTER:
      const newFilters = { ...state.activeFilters }
      delete newFilters[action.payload]
      return {
        ...state,
        activeFilters: newFilters
      }

    case actionTypes.SET_CANVAS_REF:
      return {
        ...state,
        canvasRef: action.payload
      }

    case actionTypes.SET_SELECTED_TOOL:
      return {
        ...state,
        selectedTool: action.payload
      }

    case actionTypes.RESET_STATE:
      return {
        ...initialState,
        gallery: state.gallery // Keep gallery when resetting
      }

    default:
      return state
  }
}

// Create context
const ImageContext = createContext()

// Hook to use the context
export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider')
  }
  return context
}

// Provider component
export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState)

  // Action creators
  const actions = {
    setCurrentImage: useCallback((image) => {
      dispatch({ type: actionTypes.SET_CURRENT_IMAGE, payload: image })
    }, []),

    addGeneratedImage: useCallback((image) => {
      const imageWithId = {
        ...image,
        id: `generated_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        type: 'generated'
      }
      dispatch({ type: actionTypes.ADD_GENERATED_IMAGE, payload: imageWithId })
      return imageWithId
    }, []),

    addToGallery: useCallback((image) => {
      const galleryItem = {
        ...image,
        id: image.id || `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        savedAt: new Date().toISOString()
      }
      dispatch({ type: actionTypes.ADD_TO_GALLERY, payload: galleryItem })
      return galleryItem
    }, []),

    removeFromGallery: useCallback((imageId) => {
      dispatch({ type: actionTypes.REMOVE_FROM_GALLERY, payload: imageId })
    }, []),

    setLoading: useCallback((loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading })
    }, []),

    setError: useCallback((error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error })
    }, []),

    clearError: useCallback(() => {
      dispatch({ type: actionTypes.CLEAR_ERROR })
    }, []),

    addToHistory: useCallback((historyItem) => {
      dispatch({ type: actionTypes.ADD_TO_HISTORY, payload: historyItem })
    }, []),

    undoLastAction: useCallback(() => {
      dispatch({ type: actionTypes.UNDO_LAST_ACTION })
    }, []),

    applyFilter: useCallback((name, value) => {
      dispatch({ type: actionTypes.APPLY_FILTER, payload: { name, value } })
    }, []),

    removeFilter: useCallback((filterName) => {
      dispatch({ type: actionTypes.REMOVE_FILTER, payload: filterName })
    }, []),

    setCanvasRef: useCallback((ref) => {
      dispatch({ type: actionTypes.SET_CANVAS_REF, payload: ref })
    }, []),

    setSelectedTool: useCallback((tool) => {
      dispatch({ type: actionTypes.SET_SELECTED_TOOL, payload: tool })
    }, []),

    resetState: useCallback(() => {
      dispatch({ type: actionTypes.RESET_STATE })
    }, [])
  }

  const value = {
    ...state,
    actions
  }

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  )
}