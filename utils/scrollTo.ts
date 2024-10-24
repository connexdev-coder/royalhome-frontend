export default function (id: string) {
  const route = useRoute();

  if (route.path == "/") {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    navigateTo("/");
  }
}
