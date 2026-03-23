import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ReadProgressBar: React.FC = () => {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const isPostPage = router.pathname === "/[slug]"

  useEffect(() => {
    if (!isPostPage) {
      setProgress(0)
      return
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight
        if (scrollable < 1200) {
          setProgress(0)
          timeoutId = null
          return
        }
        const percent = (window.scrollY / scrollable) * 100
        setProgress(percent > 90 ? 100 : percent)
        timeoutId = null
      }, 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isPostPage])

  return <StyledBar style={{ width: `${progress}%` }} />
}

export default ReadProgressBar

const StyledBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.blue9};
  transition: width 0.1s ease;
`
